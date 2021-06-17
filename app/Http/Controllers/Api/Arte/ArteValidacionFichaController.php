<?php

namespace App\Http\Controllers\Api\Arte;

use App\Arte;
use App\ValidacionFicha;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Requests\IncidenciaValidacion;

class ArteValidacionFichaController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($arte_id)
    {
        $arte = Arte::findOrFail($arte_id);
        return $this->showAll($arte->validacionFicha);
    }

   
    public function store(IncidenciaValidacion $request, $arte_id)
    {
        $validated = $request->validated();
        $arte = Arte::findOrFail($arte_id);
        $arte_ficha_validacion = new ValidacionFicha();
        $arte_ficha_validacion->arte_id = $arte->id;
        $arte_ficha_validacion->user_id = auth()->user()->id;
        $arte_ficha_validacion->titulo = $request->titulo;
        $arte_ficha_validacion->descripcion = $request->descripcion;
        $arte_ficha_validacion->save();
        return $this->showOne($arte_ficha_validacion);
    }

  
    public function show($validacion_ficha_id)
    {
        $ficha_validacion = ValidacionFicha::findOrFail($validacion_ficha_id);
        return $this->showOne($ficha_validacion);
    }

   
    public function update(IncidenciaValidacion $request, $validacion_ficha_id)
    {
        $validated = $request->validated();
        $ficha_validacion = ValidacionFicha::findOrFail($validacion_ficha_id);
        $ficha_validacion->update($request->all());
        $ficha_validacion->save();
        return $this->showOne($ficha_validacion);
    }

    
    public function destroy($validacion_ficha_id)
    {
        $ficha_validacion = ValidacionFicha::findOrFail($validacion_ficha_id);
        $ficha_validacion->delete();
        return $this->showOne($ficha_validacion);
    }
}
