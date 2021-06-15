<?php

namespace App\Http\Controllers\Api\Arte;

use App\Arte;
use App\Boceto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;

class ArteBocetoController extends ApiController
{
    
    public function index($boceto_id)
    {
        $arte = Arte::findOrFail($boceto_id);
        return $this->showAll($arte->boceto);
    }

    
    public function store(Request $request, $arte_id)
    {
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

   
    public function update(Request $request, Boceto $boceto_id)
    {
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
