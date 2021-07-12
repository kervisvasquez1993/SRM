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
        $pivotPrincipal = PivotTareaProveeder::where('iniciar_negociacion', true);

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
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        // Obtener la tarea
        $tarea = Tarea::findOrFail($request->tarea_id);

        // Obtener el proveedor
        $proveedor = Proveedor::findOrFail($request->proveedor_id);

        // Comprobar si el proveedor ya está agregado a esta tarea
        if (!$tarea->proveedores->where('id', $proveedor->id)->isEmpty()) {
            return $this->errorResponse("Este proveedor ya está agregado a esta tarea", Response::HTTP_BAD_REQUEST);
        }
            
        $pivot = new PivotTareaProveeder();
        $pivot->tarea_id = $tarea->id;
        $pivot->proveedor_id = $proveedor->id;
        $pivot->iniciar_negociacion = false;
        $pivot->iniciar_arte = false;
        $pivot->iniciar_produccion = false;
        $pivot->save();
        //notification para 
        $login_user       = Auth::user()->name;
        $coordinador      = User::find($tarea->sender_id);
        $tarea_nombre     = $tarea->nombre;
        $empresa_agregada = $proveedor->nombre;
        $presidentes = User::where('rol', 'presidente')->get();
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
        // Actualizar el valor del codigo PO (compra_po)
        $pivot_id->update($request->all());
        
        return $this->showOneResource(new PivotTareaProveederResource($pivot_id));
    }

    public function startArte($pivotTareaProveederId)
    {
        $pivot = PivotTareaProveeder::findOrFail($pivotTareaProveederId);
        $pivot->iniciar_arte = 1;
        $pivot->save();
        // TODO: Cambiar la forma en que se inicializa el nombre
        $this->artesCreate($pivot->id, $pivot->compra_po);
        $pivotResource = new PivotTareaProveederResource($pivot);

        return $this->showOneResource($pivotResource);
    }

    public function startProduccion($pivotTareaProveederId)
    {
        $pivot = PivotTareaProveeder::findOrFail($pivotTareaProveederId);

        // No se puede iniciar produccion sin un codigo PO
        if ($pivot->compra_po === null) {
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
        if ($artesCreate) {
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
        $userAll = User::where('rol', 'artes')->orWhere('rol', 'presidente')->get();
        $userUni =  $userAll->push($comprador,$coordinador)->unique('id');
        $body = "El usuario $userLogin inicio Arte con la empresa $nombreEmpresa";
        $link = "/arts?id=$arte->id";
        $type = "iniciar_arte";
        Notification::send($userUni, new GeneralNotification($body, $link, $type));
    }

    public function produccionTransitoCreate($id)
    {
        $producionTransito = ProduccionTransito::where('pivot_tarea_proveeder_id', $id)->first();
        if ($producionTransito) {
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
        $userAll = User::where('rol','logistica')->orWhere('rol', 'presidente')->get();
        $userUni =  $userAll->push($comprador, $coordinador)->unique('id');
        $body = "El usuario $userLogin inicio Producción con la empresa '$nombreEmpresa' asociado a la tarea '$nombreTarea'";
        $link = "/productions?id=$produccionAprobar->id";
        $type = "iniciar_produccion";
        Notification::send($userUni, new GeneralNotification($body, $link, $type));
    }
}
