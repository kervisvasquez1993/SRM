<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\InspeccionProducto;

class inspeccionProductoController extends ApiController
{
    
    public function store( Request $request, RecepcionReclamoDevolucion $reclamos_devoluciones_id)
    {
        $request->merge(['recepcion_reclamo_devolucion_id', $reclamos_devoluciones_id->id]);
        $inspeccion_producto =  InspeccionProducto::create($request->all());
        return $inspeccion_producto;
        
        
    }
}
