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
use Illuminate\Support\Facades\Notification;
use App\Notifications\ProduccionNotificacion;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\PivotTareaProveederResource;

class PivotController extends ApiController
{
    public function index()
    {
        $pivotPrincipal = PivotTareaProveeder::where('iniciar_negociacion', 1);
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

        return $this->showOneResource(new PivotTareaProveederResource($pivot));
    }

    public function show($pivot_id)
    {
        $pivot =  new PivotTareaProveederResource(PivotTareaProveeder::findOrFail($pivot_id));
        return  $this->showOneResource($pivot);
    }

    public function update(Request $request, $pivot_id)
    {
        $usuario = Auth::user();

        if ($usuario->rol != 'coordinador') {
            return $this->errorResponse("Acceso no permitido", Response::HTTP_FORBIDDEN);
        }

        $pivot = PivotTareaProveeder::findOrFail($pivot_id);

        // El PO no puede editarse si ya se inicio produccion
        if ($request->compra_po === null && $pivot->iniciar_produccion === 1) {
            return $this->errorResponse("No se puede eliminar el PO de una negociación que ya inicio producción", Response::HTTP_BAD_REQUEST);
        }

        // El PO no se puede agregar si no hay compras
        if ($request->compra_po != null && $pivot->compras->count() < 1) {
            return $this->errorResponse("No se puede agregar un PO si no hay compras", Response::HTTP_BAD_REQUEST);
        }

        // Actualizar el valor del codigo PO (compra_po)
        $pivot->compra_po = $request->compra_po;
        $pivot->save();

        return $this->showOneResource(new PivotTareaProveederResource($pivot));
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
        $arte->nombre = 'test';
        $arte->creacion_fichas = 'sin_inicializar';
        $arte->validacion_fichas = 'sin_inicializar';
        $arte->creacion_boceto =  'sin_inicializar';
        $arte->validacion_boceto = 'sin_inicializar';
        $arte->confirmacion_proveedor = 'sin_inicializar';
        $arte->fecha_fin = Carbon::now(); /* //TODO cambiar el metodo de carbon por fecha de finalizacion recibida de request */
        $arte->save();
        $nombreEmpresa = $arte->pivotTable->proveedor->nombre;     
        $userLogin = Auth::user()->name;  
        $userAll = User::where('rol', 'arte')->orWhere('rol','coordinador')->get();
        $userUni =  $userAll->unique('id');
        $body = "El usuario $userLogin inicio Arte con la empresa $nombreEmpresa";
        $link = url('#');
        Notification::send($userUni, new ArteNotification($body,$link));
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
        $nombreEmpresa = $produccionAprobar->pivotTable->proveedor->nombre;
        $nombreTarea = $produccionAprobar->pivotTable->tarea->nombre;
        $userLogin = Auth::user()->name; 
        $userAll = User::where('rol', 'logistica')->orWhere('rol','coordinador')->get();
        $comprador_asignado =  $produccionAprobar->pivotTable->tarea->usuarios; 
        $userAll->push($comprador_asignado); 
        $userFormat =  $userAll->unique('id');
        $body = "El usuario $userLogin inicio Produccion con la empresa $nombreEmpresa asociada a la tarea $nombreTarea.";
        $link = url('#');
        Notification::send($userFormat, new ProduccionNotificacion($body,$link));          
    }
}
