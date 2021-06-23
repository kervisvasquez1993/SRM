<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Resources\ReclamoDevolucionResource;

class ReclamoDevolucionController extends ApiController
{
   
    public function index()
    {
        return $this->showAllResources(ReclamoDevolucionResource::collection(RecepcionReclamoDevolucion::all()));
    }

    
    public function show( RecepcionReclamoDevolucion $reclamos_devolucione)
    {
        return $this->showOneResource(new ReclamoDevolucionResource($reclamos_devolucione));
    }

    public function update(Request $request, RecepcionReclamoDevolucion $reclamos_devolucione)
    {
        $reclamos_devolucione->update($request->all());
        $reclamos_devolucione->save();
        return $this->showOneResource(new ReclamoDevolucionResource($reclamos_devolucione));
    }

    public function destroy($id)
    {
        //
    }
}