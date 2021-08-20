<?php

namespace App\Http\Controllers\Api\Tarea;
use App\Tarea;
use App\IncidenciaTarea;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\IncidenciaResource;
use Symfony\Component\HttpFoundation\Response;


class IncidenciaTareaController extends ApiController
{
    public function index( Tarea $tarea_id)
    {
        $cometarios = IncidenciaResource::collection($tarea_id->incidenciaTarea);
        return $this->showAllResources($cometarios); 
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
        return $this->showOneResource(new IncidenciaResource($comentario_tarea)); 
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

        return $this->showOneResource(new IncidenciaResource($tarea_comentario));

        


    }
    public function destroy(IncidenciaTarea $tarea_comentario)
    {
        $tarea_comentario->delete();
        return $this->showOneResource(new IncidenciaResource($tarea_comentario));
    }
}
