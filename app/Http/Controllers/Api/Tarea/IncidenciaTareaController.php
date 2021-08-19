<?php

namespace App\Http\Controllers\Api\Tarea;
use App\Tarea;
use App\IncidenciaTarea;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;


class IncidenciaTareaController extends ApiController
{
    public function index( Tarea $tarea_id)
    {
        return $tarea_id->incidenciaTarea;
    }
    public function store(Request $request,   Tarea $tarea_id)
    {
        
        $rules =
        [
            'titulo' => 'required',
            'descripcion' => 'required ',
        ];
        $validator = Validator::make($request->all(),  $rules);
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $request->merge(["tarea_id" => $tarea_id->id, "user_id" => auth()->user()->id]);
        $comentario_tarea = IncidenciaTarea::create($request->all());
        return $comentario_tarea;
    }
    public function update(Request $request, IncidenciaTarea $tarea_comentario)
    {
        $rules =
        [
            'titulo' => 'required',
            'descripcion' => 'required ',
        ];
        $validator = Validator::make($request->all(),  $rules);
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $tarea_comentario->update($request->all());

        return $tarea_comentario;
        


    }
    public function destroy()
    {
        return "desde destroy de comentario de tarea";
    }
}
