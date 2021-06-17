<?php

namespace App\Http\Controllers\Api\Arte;

use App\Arte;
use App\ValidacionBoceto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Requests\IncidenciaValidacion;

class ArteValidacionBocetoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($arte_id)
    {
        $arte = Arte::findOrFail($arte_id);
        return $this->showAll($arte->validacionBoceto);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(IncidenciaValidacion $request, $arte_id)
    {
        $validated = $request->validated();
        $arte = Arte::findOrFail($arte_id);
        $validacion_boceto = new ValidacionBoceto();
        $validacion_boceto->arte_id = $arte->id;
        $validacion_boceto->user_id = auth()->user()->id;
        $validacion_boceto->titulo = $request->titulo;
        $validacion_boceto->descripcion = $request->descripcion;
        $validacion_boceto->save();
        return $this->showOne($validacion_boceto);
    }

  
    public function show(ValidacionBoceto $validacion_boceto_id)
    {
        return $validacion_boceto_id;
    }

    
    public function update(IncidenciaValidacion $request, ValidacionBoceto $validacion_boceto_id)
    {
        $validated = $request->validated();
        $validacion_boceto_id->update($request->all());
        $validacion_boceto_id->save();
        return $this->showOne($validacion_boceto_id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ValidacionBoceto $validacion_boceto_id)
    {
        $validacion_boceto_id->delete();
        return $this->showOne($validacion_boceto_id);
    }
}
