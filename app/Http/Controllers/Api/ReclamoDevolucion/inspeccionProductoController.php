<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\ReclamoProducto;

class ReclamoProductoController extends ApiController
{
    
    public function index(RecepcionReclamoDevolucion $reclamos_devoluciones_id)
    {
        $inspeccion_productos = $reclamos_devoluciones_id->ReclamoProducto;
        return $this->showAll($inspeccion_productos);
    }
    public function store( Request $request, RecepcionReclamoDevolucion $reclamos_devoluciones_id)
    {
        $request->merge(
            [
              'recepcion_reclamo_devolucion_id' =>  $reclamos_devoluciones_id->id,
              'user_login' => auth()->user()->name,
            ]
        );
        
        $inspeccion_producto =  ReclamoProducto::create($request->all());
        return $inspeccion_producto;
    }

    public function update(Request $request, ReclamoProducto $reclamo_id)
    {
        $reclamo_id->update($request->only('titulo', 'descripcion'));
        return $this->showOne($reclamo_id);
    }
    public function destroy(ReclamoProducto $reclamo_id)
    {
        $reclamo_id->delete();
        return $this->showOne($reclamo_id);
    }
}
