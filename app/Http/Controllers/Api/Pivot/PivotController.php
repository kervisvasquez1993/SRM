<?php

namespace App\Http\Controllers\Api\Pivot;

use App\Arte;
use App\User;
use App\Tarea;
use App\Proveedor;
use Carbon\Carbon;
use App\ProduccionTransito;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ApiController;
use App\Notifications\ArteNotification;
use function PHPUnit\Framework\isEmpty;
use App\Notifications\NegociacionEmpresa;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Validator;
use App\Notifications\GeneralNotification;
use Illuminate\Support\Facades\Notification;
use App\Notifications\ProduccionNotificacion;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\PivotTareaProveederResource;

class PivotController extends ApiController
{
    public function index()
    {
        $pivotPrincipal = PivotTareaProveeder::where('productos_cargados', true);

        if (!(auth()->user()->rol == 'coordinador' || Auth::user()->rol == 'observador')) {
            $pivotPrincipal = $pivotPrincipal->whereHas('tarea', function (Builder $query) {
                $query->where('user_id', auth()->user()->id);
            });
        }
        $resultado = PivotTareaProveederResource::collection($pivotPrincipal->get());
        return $this->showAllResources($resultado);
    }

    public function store(Request $request) {
        // Crear el validador
        $validator = Validator::make($request->all(), [
            'tarea_id' => 'required|numeric',
            'proveedor_id'   => 'required|numeric'
        ]);

        // Comprobar la validacion
        if ($validator->fails()) 
        {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        // Obtener la tarea
        $tarea = Tarea::findOrFail($request->tarea_id);

        // Obtener el proveedor
        $proveedor = Proveedor::findOrFail($request->proveedor_id);

        // Comprobar si el proveedor ya está agregado a esta tarea
        if (!$tarea->proveedores->where('id', $proveedor->id)->isEmpty())
        {
            return $this->errorResponse("Este proveedor ya está agregado a esta tarea", Response::HTTP_BAD_REQUEST);
        }
            
        $pivot = new PivotTareaProveeder();
        $pivot->tarea_id = $tarea->id;
        $pivot->proveedor_id = $proveedor->id;
        $pivot->productos_cargados = false;
        $pivot->iniciar_arte = false;
        $pivot->iniciar_produccion = false;
        $pivot->save();
        //notification para 
        $login_user       = Auth::user()->name;
        $coordinador      = User::find($tarea->sender_id);
        $tarea_nombre     = $tarea->nombre;
        $empresa_agregada = $proveedor->nombre;
        $presidentes = User::where('isPresidente', true)->get();
        $userAll = $presidentes->push($coordinador)->unique('id'); 
        $text = "El usuario '$login_user' añadió la empresa '$empresa_agregada' a la tarea '$tarea_nombre'";
        $link = "/tasks/$tarea->id?providerId=$proveedor->id"; 
        $type = "empresa_agregada";
        $title = "Empresa Agregada";
        /* Notification::send($userAll, new GeneralNotification($text, $link, $type)); */  
        $this->sendNotifications($userAll, new GeneralNotification($text, $link, $type, $title));
        return $this->showOneResource(new PivotTareaProveederResource($pivot));
    }

    public function show($pivot_id)
    {
        $pivot =  new PivotTareaProveederResource(PivotTareaProveeder::findOrFail($pivot_id));
        return  $this->showOneResource($pivot);
    }

    public function update(Request $request, PivotTareaProveeder $pivot_id)
    {

    
        $pivot_id->fill($request->all());
        /* si cambia el valor de productos cargados */
        $login_user    = auth()->user()->name;
        $coordinador = User::find($pivot_id->tarea->sender_id);
        $presidentes = User::where('isPresidente', true)->get();
        $comprador = $pivot_id->tarea->usuario;
        $proveedorName = Proveedor::findOrFail($pivot_id->proveedor_id)->nombre;
        $tareaNombre   = Tarea::findOrFail($pivot_id->tarea_id)->nombre;
        $logistica = User::where('rol', 'logistica')->get()->unique('id');

        /* comprobar si los productos cambiaron */
        if($pivot_id->isDirty('productos_cargados') && $pivot_id->productos_cargados == true) 
        {  

           $userAll = $presidentes->push($coordinador, $comprador)->unique('id');
           $text = "El usuario: '$login_user' cargo via excel informacion de producto a la empresa '$proveedorName' asociada a la tarea '$tareaNombre'";
           $link = "";
           $type = "cargar_productos";
           $title = "Importacion de Productos";
           $this->sendNotifications($userAll, new GeneralNotification($text, $link, $type, $title));    

           
        }

        /* comprobariniciar arte */
         if($pivot_id->isDirty('iniciar_arte') && $pivot_id->iniciar_arte == true )
        {
            $this->artesCreate($pivot_id->id);
        } 

      

        if($pivot_id->isDirty('productos_confirmados') && $request->productos_confirmados == true)
        {   
          
          $userAll = $presidentes->push($coordinador, $comprador)->unique('id');
          $user_with_logistica = $userAll->merge($logistica);       
          $text = "El usuario: '$login_user' confirmo los productos pertenecientes a la empresa'$proveedorName' asociada a la tarea '$tareaNombre'";
          $link = "/negotiation/$pivot_id->id#products";
          $type =  "productos_confirmados";
          $title = "Productos confirmados";
          $this->sendNotifications($user_with_logistica, new GeneralNotification($text, $link, $type, $title));    
        }  
        

        if( $pivot_id->isDirty('seleccionado') && $request->seleccionado == true)
        {
            
            $text = "La empresa: '$proveedorName' asociada a la tarea '$tareaNombre' fue la seleccionada.";
            $link = "/negotiation/$pivot_id->id#products";
            $type = "empresa_seleccionada";
            $title = "Empresa Seleccionada";
            

            if($pivot_id->productos_confirmados == true)
            {
                $text = "La empresa: '$proveedorName' asociada a la tarea '$tareaNombre' fue la seleccionada y los productos ya estan seleccionado";
                $userAll = $presidentes->push($comprador)->unique('id'); 
                $user_with_logistica = $userAll->merge($logistica);            
                /* error_log("producto estan confirmado, mandar a crear los codigos de barras para esta empresa"); */
                $this->sendNotifications($user_with_logistica, new GeneralNotification($text, $link, $type, $title)); 
                
            }
            else
            {
                error_log("notificacion al comprador para que confirme los productos y notificacion a logistica para crear codigo de barra");
                $text = "La empresa: '$proveedorName' asociada a la tarea '$tareaNombre' fue la seleccionada, porfavor confirme los productos para crear los codigos de barra";
                $userAll = $presidentes->push($comprador)->unique('id');            
                /* error_log("producto estan confirmado, mandar a crear los codigos de barras para esta empresa"); */
                $this->sendNotifications($userAll, new GeneralNotification($text, $link, $type, $title)); 
            }


            
            

            
        }



       if($pivot_id->isClean())
       {
           
           error_log('errrrroooor');
       }
        error_log('ejecutado');
        $pivot_id->save();
        return $this->showOneResource(new PivotTareaProveederResource($pivot_id));
    }

    public function startProduccion($pivotTareaProveederId)
    {
        $pivot = PivotTareaProveeder::findOrFail($pivotTareaProveederId);
        // No se puede iniciar produccion sin un codigo PO
        if ($pivot->compra_po === null) 
        {
            return $this->errorResponse("No se puede iniciar producción sin un codigo PO", Response::HTTP_BAD_REQUEST);
        }
        $pivot->iniciar_produccion = 1;
        $pivot->save();
        $this->produccionTransitoCreate($pivot->id);
        $pivotResource = new PivotTareaProveederResource($pivot);
        return $this->showOneResource($pivotResource);
    }

    public function artesCreate($id)
    {
        $artesCreate = Arte::where('pivot_tarea_proveeder_id', $id)->first();
        if ($artesCreate) 
        {
            return $this->successMensaje('Ya se Inicializo El Arte con este Proveedor', 201);
        }
        $arte = new Arte();
        $arte->pivot_tarea_proveeder_id = $id;
        $arte->creacion_fichas = 'sin_inicializar';
        $arte->validacion_fichas = 'sin_inicializar';
        $arte->creacion_boceto =  'sin_inicializar';
        $arte->validacion_boceto = 'sin_inicializar';
        $arte->confirmacion_proveedor = 'sin_inicializar';
        $arte->fecha_fin = Carbon::now(); /* //TODO cambiar el metodo de carbon por fecha de finalizacion recibida de request */
        $arte->save();
        $nombreEmpresa   = $arte->pivotTable->proveedor->nombre;
        $comprador = User::find($arte->pivotTable->tarea->user_id);
        $coordinador     = User::find($arte->pivotTable->tarea->sender_id);
        $userLogin = Auth::user()->name;
        $userAll = User::where('rol', 'artes')->orWhere('isPresidente', true)->get();
        $userUni =  $userAll->push($comprador,$coordinador)->unique('id');
        $body    = "El usuario $userLogin inicio Arte con la empresa $nombreEmpresa";
        $link    = "/arts?id=$arte->id";
        $type    = "iniciar_arte";
        $title   = "Inicio de Arte";
        /* Notification::send($userUni, new GeneralNotification($body, $link, $type)); */
        error_log($userAll);
        $this->sendNotifications($userAll, new GeneralNotification($body, $link, $type, $title));
    }

    public function produccionTransitoCreate($id)
    {
        $producionTransito = ProduccionTransito::where('pivot_tarea_proveeder_id', $id)->first();
        if ($producionTransito) 
        {
            return $this->successMensaje('Ya se Inicializo la produccion con este Proveedor', 201);
        }
        $produccionAprobar = new ProduccionTransito();
        $produccionAprobar->pivot_tarea_proveeder_id = $id;
        $produccionAprobar->save(); 
        /* notificacion para inicar produccion */
        $nombreEmpresa = $produccionAprobar->pivotTable->proveedor->nombre;
        $nombreTarea   = $produccionAprobar->pivotTable->tarea->nombre;
        $comprador     = User::find($produccionAprobar->pivotTable->tarea->user_id);
        $coordinador   = User::find($produccionAprobar->pivotTable->tarea->sender_id);
        $userLogin = Auth::user()->name;
        $userAll = User::where('rol','logistica')->orWhere('isPresidente', true)->get();
        $userUni =  $userAll->push($comprador, $coordinador)->unique('id');
        $body    = "El usuario $userLogin inicio Producción con la empresa '$nombreEmpresa' asociado a la tarea '$nombreTarea'";
        $link    = "/productions?id=$produccionAprobar->id";
        $type    = "iniciar_produccion";
        $title   = "Inicio de Produccion";
        /* Notification::send($userUni, new GeneralNotification($body, $link, $type)); */
        $this->sendNotifications($userUni, new GeneralNotification($body, $link, $type, $title));
    }
}
