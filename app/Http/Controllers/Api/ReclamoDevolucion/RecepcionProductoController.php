<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use App\RecepcionProducto;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\ApiController;

class RecepcionProductoController extends ApiController
{
  
    public function index(RecepcionReclamoDevolucion $reclamos_devoluciones_id)
    {
        $productos = $reclamos_devoluciones_id->recepcionProducto;
        return $this->showAll($productos);
    }

  
    public function store(Request $request)
    {
        
    }

    public function importProducts(Request $request, $id)
    {
        $archivo = $request->file('import');
        Excel::import(new RecepcionProducto(), $archivo);
    }

    
    public function show($id)
    {
        //
    }

    
    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
