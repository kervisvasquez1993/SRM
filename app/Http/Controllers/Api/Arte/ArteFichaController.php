<?php

namespace App\Http\Controllers\Api\Arte;

use App\Arte;
use App\Ficha;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;

class ArteFichaController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($arte_id)
    {
        $arte = Arte::findOrFail($arte_id);
        return $this->showAll($arte->ficha);
        
    }

    
    public function store(Request $request, $arte_id)
    {
        $arte = Arte::findOrFail($arte_id);
        $arte_ficha = new Ficha();
        $arte_ficha->arte_id = $arte->id;
        $arte_ficha->user_id = auth()->user()->id;
        $arte_ficha->titulo = $request->titulo;
        $arte_ficha->descripcion = $request->descripcion;
        $arte_ficha->save();
        return $this->showOne($arte_ficha);
    }

    
    public function show($fichaId)
    {
        $ficha = Ficha::findOrFail($fichaId);
        return $this->showOne($ficha);
    }

    public function update(Request $request, $fichaId)
    {
        $ficha = Ficha::findOrFail($fichaId);
        $ficha->update($request->all());
        $ficha->save();
        return $this->showOne($ficha);
    }

   
    public function destroy($fichaId)
    {
        $ficha = Ficha::findOrFail($fichaId);
        $ficha->delete();
        return $this->showOne($ficha);
    }
}
