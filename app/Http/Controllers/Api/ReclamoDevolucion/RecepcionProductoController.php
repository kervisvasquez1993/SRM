<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use App\RecepcionProducto;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\ApiController;
use App\Imports\RecepcionProductoImport;

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

    public function importProducts(Request $request, RecepcionReclamoDevolucion $reclamos_devoluciones_id)
    {

        $archivo = $request->file('import');
        $reclamos_devoluciones_id->recepcionProducto()->delete();
        Excel::import(new RecepcionProductoImport($reclamos_devoluciones_id->id), $archivo);
        return "cargado exitosamente";
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
