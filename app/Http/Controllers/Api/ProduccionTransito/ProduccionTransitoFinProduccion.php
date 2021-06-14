<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use auth;
use App\FinProduccion;
use App\ProduccionTransito;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;

class ProduccionTransitoFinProduccion extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($produccion_transito_id)
    {
        $produccion_transito = ProduccionTransito::findOrFail($produccion_transito_id);

        return $this->showAll($produccion_transito->finProduccion);
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $produccion_transito_id)
    {
        $fin_produccion = new FinProduccion();
        $produccion_transito = ProduccionTransito::findOrFail($produccion_transito_id);
        $fin_produccion->produccion_transito_id = $produccion_transito->id;
        $fin_produccion->user_id = auth()->user()->id;
        $fin_produccion->titulo = $request->titulo;
        $fin_produccion->descripcion = $request->descripcion;
        $fin_produccion->save();
        return $this->showOne($fin_produccion);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($fin_produccion_id)
    {
        $fin_produccion_show = FinProduccion::findOrFail($fin_produccion_id);

        return $this->showOne($fin_produccion_show);
    }

    
    public function update(Request $request, $fin_produccion_id)
    {
        
        $fin_produccion_show = FinProduccion::findOrFail($fin_produccion_id);   
        
        $fin_produccion_show->update($request->all());
        $fin_produccion_show->save();
        return $this->showOne($fin_produccion_show);
    }

    public function destroy($fin_produccion_id)
    {
        $fin_produccion_show = FinProduccion::findOrFail($fin_produccion_id);
        $fin_produccion_show->delete();
        return $this->showOne($fin_produccion_show);
    }
}
