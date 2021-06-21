<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use App\RecepcionMercancia;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Requests\IncidenciaValidacion;

class IncidenciaRecepcion extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(RecepcionReclamoDevolucion $reclamos_devolucione)
    {
        
        $incidencia_recepcion = $reclamos_devolucione->recepcionMercancia;
        return $this->showAll($incidencia_recepcion);
    }

   
    public function store(IncidenciaValidacion $request, RecepcionReclamoDevolucion $reclamos_devolucione)
    {
        $reclamos_devolucione_id = $reclamos_devolucione->id;
         $request->merge([
            'recepcion_reclamo_devolucions_id' => $reclamos_devolucione_id,
            'user_id' => auth()->user()->id
        ]);
        $test = $request->all();
        $recepcion_mercancia = RecepcionMercancia::create($test);   
        return $this->showOne($recepcion_mercancia);  
        
    }

   
    public function show(RecepcionMercancia $incidencia_recepcion_id)
    {
       
        return $this->showOne($incidencia_recepcion_id);
    }

   
    public function update(IncidenciaValidacion $request, RecepcionMercancia $incidencia_recepcion_id)
    {
         $incidencia_recepcion_id->update($request->only('titulo', 'descripcion'));
         $incidencia_recepcion_id->save();
         return $this->showOne($incidencia_recepcion_id);
    }

  
    public function destroy( RecepcionMercancia $incidencia_recepcion_id)
    {  
        $incidencia_recepcion_id->delete();
        return $this->showOne($incidencia_recepcion_id);

    }
}
