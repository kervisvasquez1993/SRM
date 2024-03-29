<?php

namespace App\Http\Controllers\Api\Tarea;

use App\DraggableTask;
use App\Http\Controllers\ApiController;
use App\Http\Resources\PivotTareaProveederResource;
use App\Http\Resources\TareaResource;
use App\Jobs\ExportarComparacionJob;
use App\Notifications\GeneralNotification;
use App\PivotTareaProveeder;
use App\Proveedor;
use App\Tarea;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class TareaController extends ApiController
{
    public function __construct()
    {
    }

    public function index()
    {
        $tareas = TareaResource::collection(Tarea::all());
        return $this->showAllResources($tareas);
    }

    public function store(Request $request)
    {
        $proveedor = $request->proveedor_id;

        $rules = ['nombre' => 'required', 'descripcion' => 'required '];

        if (!$proveedor) {
            $rules = array_merge($rules, ['fecha_fin' => 'required | date | after: 0 days']);
        }

        if (!$request->tareasPersonales) {
            error_log($request->tareasPersonales);
            $rules = array_merge($rules, ['user_id' => 'required']);
        }

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $tarea = new Tarea();
        $tarea->nombre = $request->nombre;
        $tarea->descripcion = $request->descripcion;
        $tarea->sender_id = auth()->id();

        if ($proveedor) {
            $tarea->user_id = $request->user_id ? $request->user_id : auth()->id();
            $tarea->fecha_fin = Carbon::now()->addDays(30);
            $tarea->save();
            /* tarea creada */
            $proveedor = Proveedor::findOrFail($proveedor);
            $pivot = new PivotTareaProveeder();
            $pivot->tarea_id = $tarea->id;
            $pivot->proveedor_id = $proveedor->id;
            $pivot->orden_compra_directa = true;
            $pivot->seleccionado = true;
            $pivot->save();
        } else {
            /* crear tarea sin orden de compra */
            $tarea->user_id = $request->user_id ? $request->user_id : auth()->id();
            $tarea->fecha_fin = $request->fecha_fin;
            $tarea->save();
        }

        /* seccion para las notificaciones */
        $comprador = User::find($tarea->user_id);
        $coordinador = User::find($tarea->sender_id);
        $presidentes = User::where('isPresidente', true)->get();
        $userAll = $presidentes->push($comprador, $coordinador)->unique('id');
        $text = "El coordinador $coordinador->name asigno la tarea: $tarea->nombre al usuario $comprador->name y finaliza $tarea->fecha_fin";
        $link = "tasks/$tarea->id";
        $type = "tarea_asignada";
        $title = "Tarea Asignada";

        // Mover todos los cards arrastrables de la columna 0 una posicion hacia abajo
        $cards = DraggableTask::where('column', 0)->get();

        foreach ($cards as $card) {
            $card->row = $card->row + 1;
            $card->save();
        }

        // Crear un nuevo card arrastrable
        $draggable = new DraggableTask();
        $draggable->tarea_id = $tarea->id;
        $draggable->save();

        $this->sendNotifications($userAll, new GeneralNotification($text, $link, $type, $title));

        return $this->showOneResource(new TareaResource($tarea));
    }

    public function show(Tarea $tarea)
    {
        return $this->showOneResource(new TareaResource($tarea));
    }

    public function update(Request $request, Tarea $tarea)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
            'user_id' => 'required',
            'descripcion' => 'required ',
            'fecha_fin' => 'required | date | after: 0 days',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $tarea->update($request->all());

        return $this->showOneResource(new TareaResource($tarea));
    }

    public function destroy(Tarea $tarea)
    {
    }

    public function tareasUsuario(Request $request)
    {
        $tareas = Tarea::where('user_id', auth()->user()->id)->get();

        return $this->showAllResources(TareaResource::collection($tareas));
    }

    public function exportarComparativa(Request $request, Tarea $tarea)
    {
        // Correr la exportación de fondo
        $job = new ExportarComparacionJob($request->user(), $tarea);
        $this->dispatch($job);

        return $this->successMensaje($job->respuestaJson());
    }

    public function obtenerNegociaciones(Tarea $tarea)
    {
        return $this->showAllResources(PivotTareaProveederResource::collection($tarea->pivotTareaProveedor));
    }
}
