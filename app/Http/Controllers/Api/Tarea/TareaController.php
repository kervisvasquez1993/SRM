<?php

namespace App\Http\Controllers\Api\Tarea;

use App\Tarea;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\TareaResource;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class TareaController extends Controller
{
    public function __construct()
    {
        $this->middleware('comprador');
    }

    public function index()
    {
        $tareas = Tarea::all();

        return TareaResource::collection($tareas);
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
        $tarea->descripcion = $request->descripcion;
        $tarea->fecha_fin = $request->fecha_fin;
        $tarea->save();

        return new TareaResource($tarea);
    }

    public function show(Tarea $tarea)
    {
        return new TareaResource($tarea);
    }

    public function update(Request $request, Tarea $tarea)
    {
        $validator = Validator::make($request->all(), [
            'nombre'      => 'required',
            'descripcion' => 'required ',
            'fecha_fin'  =>  'required | date | after: 0 days'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $tarea->nombre = $request->nombre;
        $tarea->descripcion = $request->descripcion;
        $tarea->fecha_fin = $request->fecha_fin;
        $tarea->save();
        return new TareaResource($tarea);
    }

    public function destroy(Tarea $tarea)
    {
    }
}
