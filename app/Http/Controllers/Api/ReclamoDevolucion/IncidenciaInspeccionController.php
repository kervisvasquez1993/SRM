<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use App\InspeccionCarga;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Requests\IncidenciaValidacion;

class IncidenciaInspeccionController extends ApiController
{
   

    public function index(RecepcionReclamoDevolucion $reclamos_devolucione)
    {
        
        $incidencia_inspeccion = $reclamos_devolucione->inspeccionCarga;
        return $this->showAll($incidencia_inspeccion);
    }

   
    public function store(IncidenciaValidacion $request, RecepcionReclamoDevolucion $reclamos_devolucione)
    {
        $reclamos_devolucione_id = $reclamos_devolucione->id;
         $request->merge([
            'recepcion_reclamo_devolucions_id' => $reclamos_devolucione_id,
            'user_id' => auth()->user()->id
        ]);
        $test = $request->all();
        $recepcion_mercancia = InspeccionCarga::create($test);   
        return $this->showOne($recepcion_mercancia);  
        
    }

   
    public function show(InspeccionCarga $iinspeccion_carga)
    {
       
        return $this->showOne($iinspeccion_carga);
    }

   
    public function update(IncidenciaValidacion $request, InspeccionCarga $iinspeccion_carga)
    {
         $iinspeccion_carga->update($request->only('titulo', 'descripcion'));
         $iinspeccion_carga->save();
         return $this->showOne($iinspeccion_carga);
    }

  
    public function destroy( InspeccionCarga $iinspeccion_carga)
    {  
        $iinspeccion_carga->delete();
        return $this->showOne($iinspeccion_carga);

    }
}
