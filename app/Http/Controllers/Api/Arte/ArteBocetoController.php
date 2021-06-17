<?php

namespace App\Http\Controllers\Api\Arte;

use App\Arte;
use App\Boceto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Requests\IncidenciaValidacion;

class ArteBocetoController extends ApiController
{
    
    public function index($arte_id)
    {
        $arte = Arte::findOrFail($arte_id);
        return $this->showAll($arte->boceto);
    }

    
    public function store(IncidenciaValidacion $request, $arte_id)
    {
        $validated = $request->validated();
        $arte = Arte::findOrFail($arte_id);
        $boceto = new Boceto();
        $boceto->arte_id = $arte->id;
        $boceto->user_id = auth()->user()->id;
        $boceto->titulo = $request->titulo;
        $boceto->descripcion = $request->descripcion;
        $boceto->save();
        return $this->showOne($boceto);
    
    }

  
    public function show(Boceto $boceto_id)
    {
        return $this->showOne($boceto_id);
    }

   
    public function update(IncidenciaValidacion $request, Boceto $boceto_id)
    {
        $validated = $request->validated();
        $boceto_id->update($request->all());
        $boceto_id->save();
        return $this->showOne($boceto_id);
    }

    
    public function destroy(Boceto $boceto_id)
    {
        $boceto_id->delete();
        return $this->showOne($boceto_id);
    }
}
