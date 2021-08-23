<?php

namespace App\Http\Controllers\Api\Tarea;

use App\Http\Controllers\ApiController;
use App\Http\Requests\IncidenciaValidacion;
use App\Http\Resources\IncidenciaResource;
use App\IncidenciaTarea;
use App\Tarea;

class IncidenciaTareaController extends ApiController
{
    public function index(Tarea $tarea_id)
    {
        $cometarios = IncidenciaResource::collection($tarea_id->incidenciaTarea);
        return $this->showAllResources($cometarios);
    }
    public function store(IncidenciaValidacion $request, Tarea $tarea_id)
    {
        $request->validated();

        $request->merge(["tarea_id" => $tarea_id->id, "user_id" => auth()->user()->id]);
        $comentario_tarea = IncidenciaTarea::create($request->all());
        return $this->showOneResource(new IncidenciaResource($comentario_tarea));
    }
    public function update(IncidenciaValidacion $request, IncidenciaTarea $tarea_comentario)
    {
        $request->validated();

        $tarea_comentario->update($request->all());

        return $this->showOneResource(new IncidenciaResource($tarea_comentario));

    }
    public function destroy(IncidenciaTarea $tarea_comentario)
    {
        $tarea_comentario->delete();
        return $this->showOneResource(new IncidenciaResource($tarea_comentario));
    }
}
