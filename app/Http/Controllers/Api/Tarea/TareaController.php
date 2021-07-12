<?php

namespace App\Http\Controllers\Api\Tarea;

use App\User;
use App\Tarea;
use Google\Client;
use Illuminate\Http\Request;
use App\Notifications\TareaSent;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use App\Http\Resources\TareaResource;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use App\Notifications\GeneralNotification;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpFoundation\Response;

class TareaController extends ApiController
{
    public function __construct()
    {
        $this->middleware('comprador');
    }

    public function index()
    {
        $tareas = TareaResource::collection(Tarea::all());
        return $this->showAllResources($tareas);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre'      => 'required',
            'user_id'     => 'required',
            'descripcion' => 'required ',
            'fecha_fin'  =>  'required | date | after: 0 days'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $tarea = new Tarea();
        $tarea->nombre = $request->nombre;
        $tarea->user_id = $request->user_id;
        $tarea->sender_id =  auth()->id();
        $tarea->descripcion = $request->descripcion;
        $tarea->fecha_fin = $request->fecha_fin;
        $tarea->save();

        /* seccion para las notificaciones */
        $comprador = User::find($tarea->user_id);
        $coordinador = User::find($tarea->sender_id);
        $presidentes = User::where('rol', 'presidente')->get();
        $userAll = $presidentes->push($comprador, $coordinador)->unique('id');
        $text = "El coordinador $coordinador->name asigno la tarea: $tarea->nombre al usuario $comprador->name y finaliza $tarea->fecha_fin" ;
        $link = "tasks/$tarea->id";
        $type = "tarea_asignada";
        $title = "Tarea Asignada";
        
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
            'nombre'      => 'required',
            'user_id'     => 'required',
            'descripcion' => 'required ',
            'fecha_fin'  =>  'required | date | after: 0 days'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $tarea->nombre = $request->nombre;
        $tarea->user_id = $request->user_id;
        $tarea->descripcion = $request->descripcion;
        $tarea->fecha_fin = $request->fecha_fin;
        $tarea->save();

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
}
