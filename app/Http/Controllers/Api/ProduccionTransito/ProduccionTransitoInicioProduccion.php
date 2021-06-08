<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use App\InicioProduccion;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;

class ProduccionTransitoInicioProduccion extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $inicioProduccion = InicioProduccion::where('produccion_transito_id', $request->negociacion_id)->get();
        return $this->showAll($inicioProduccion);
    }

   
    public function store(Request $request)
    {
        $inicioProduccion = new InicioProduccion();
        $inicioProduccion->produccion_transito_id = $request->negociacion_id;
        $inicioProduccion->user_id = auth()->user()->id;
        $inicioProduccion->titulo = $request->titulo;
        $inicioProduccion->descripcion = $request->descripcion;
        $inicioProduccion->save();
        return $this->showOne($inicioProduccion);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($inicioProduccion_id)
    {
        /* $inicioProduccion = InicioProduccion::findOrFail($inicioProduccion_id);

        $inicioProduccion->update */
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $inicioProduccion_id)
    {
        $inicioProduccion = InicioProduccion::findOrFail($inicioProduccion_id);
        $inicioProduccion->update($request->all());
        $inicioProduccion->save();
        return $this->showOne($inicioProduccion);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($inicioProduccion_id)
    {
        $inicioProduccion = InicioProduccion::findOrFail($inicioProduccion_id);
        $inicioProduccion->delete();
        return $this->showOne($inicioProduccion);
    }
}
