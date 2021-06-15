<?php

namespace App\Http\Controllers\Api\Arte;

use App\Arte;
use Illuminate\Http\Request;
use App\ConfirmacionProveedor;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;

class ArteConfirmacionProveedorController extends ApiController
{
    
    public function index($arte_id)
    {
        $arte = Arte::findOrFail($arte_id);
        return $this->showAll($arte->confirmacionProveedor);
    }

    public function store(Request $request, $arte_id)
    {
        $arte = Arte::findOrFail($arte_id);
        $confirmacion_proveedor = new  ConfirmacionProveedor();
        $confirmacion_proveedor->arte_id = $arte->id;
        $confirmacion_proveedor->user_id = auth()->user()->id;
        $confirmacion_proveedor->titulo = $request->titulo;
        $confirmacion_proveedor->descripcion = $request->descripcion;
        $confirmacion_proveedor->save();
        return $this->showOne($confirmacion_proveedor);
    }

    
    public function show(ConfirmacionProveedor $confirmacion_proveedor_id)
    {
        return $this->showOne($confirmacion_proveedor_id);
    }

    
    public function update(Request $request, ConfirmacionProveedor $confirmacion_proveedor_id)
    {
        $confirmacion_proveedor_id->update($request->all());
        $confirmacion_proveedor_id->save();
        return $this->showOne($confirmacion_proveedor_id);
    }

   
    public function destroy(ConfirmacionProveedor $confirmacion_proveedor_id)
    {
        $confirmacion_proveedor_id->delete();
        return $this->showOne($confirmacion_proveedor_id);
    }
}
