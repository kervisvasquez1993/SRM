<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use App\ReclamosDevolucione;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Requests\IncidenciaValidacion;

class ReclamoDevolucionesController extends ApiController
{
    public function index(RecepcionReclamoDevolucion $reclamos_devolucione)
    {
        $incidencia_recepcion = $reclamos_devolucione->reclamoDevolucion;
        return $this->showAll($incidencia_recepcion);
    }

   
    public function store(IncidenciaValidacion $request, RecepcionReclamoDevolucion $reclamos_devolucione)
    {
        $reclamos_devolucione_id = $reclamos_devolucione->id;
         $request->merge([
            'recepcion_reclamo_devolucion_id' => $reclamos_devolucione_id,
            'user_id' => auth()->user()->id
        ]);
        $test = $request->all();
        $recepcion_mercancia = ReclamosDevolucione::create($test);   
        return $this->showOne($recepcion_mercancia);  
        
    }

   
    public function show(ReclamosDevolucione $reclamos_devolucion_id)
    {
       
        return $this->showOne($reclamos_devolucion_id);
    }

   
    public function update(IncidenciaValidacion $request, ReclamosDevolucione $reclamos_devolucion_id)
    {
         $reclamos_devolucion_id->update($request->only('titulo', 'descripcion'));
         $reclamos_devolucion_id->save();
         return $this->showOne($reclamos_devolucion_id);
    }

  
    public function destroy( ReclamosDevolucione $reclamos_devolucion_id)
    {  
        $reclamos_devolucion_id->delete();
        return $this->showOne($reclamos_devolucion_id);

    }
}
