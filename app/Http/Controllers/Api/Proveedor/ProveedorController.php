<?php

namespace App\Http\Controllers\Api\Proveedor;

use App\Proveedor;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;

class ProveedorController extends ApiController
{
    public function __construct()
    {
       $this->middleware('comprador');
    }

    public function store(Request $request)
    {
        $data = Validator::make($request->all(), [
            'id_tarea' => 'required',
            'nombre' => 'required',
            'pais'   => 'required',
            'ciudad' =>  'required',
        ]);

        $proveedorArr = Proveedor::all();
        $excluidos = array();
        foreach($proveedorArr as $proveedor1):
            array_push($excluidos, $proveedor1->code_unit);
        endforeach;
        $aleatorio = rand(0,10000);
        if(in_array($aleatorio,$excluidos)):
            $aleatorio = rand(0,10000);
      /*   else:
            $aleatorio;
            */
        endif;  
        $proveedorExist = Proveedor::where('pais', strtoupper($data['pais']))->first();
            if(!$proveedorExist):
                $id_tarea = $request['id_tarea'];
                $proveedor = new Proveedor();
                $proveedor->nombre = $data['nombre'];
                $proveedor->pais   = strtoupper($data['pais']);
                $proveedor->ciudad = $data['ciudad'];
                $proveedor->distrito = $request['distrito'];
                $proveedor->code_unit = $aleatorio;
                $proveedor->address = $request['address'];
                $proveedor->contacto = $request['contacto'];
                $proveedor->telefono = $request['telefono'];
                $proveedor->email = $request['email'];
                $proveedor->descripcion = $request['descripcion'];
                $proveedor->save();
                // informacion asociada a la tabla pivot
                
            else:
                $id_tarea = $request['id_tarea'];
                $proveedor = new Proveedor();
                $proveedor->nombre = $data['nombre'];
                $proveedor->pais   = strtoupper($data['pais']);
                $proveedor->ciudad = $data['ciudad'];
                $proveedor->distrito = $request['distrito'];
                $proveedor->code_unit = $proveedorExist->code_unit;
                $proveedor->address = $request['address'];
                $proveedor->contacto = $request['contacto'];
                $proveedor->telefono = $request['telefono'];
                $proveedor->email = $request['email'];
                $proveedor->descripcion = $request['descripcion'];
                $proveedor->save();
                // informacion asociada a la tabla pivot
               
            endif;
            $this->pivotTareaProveedor($id_tarea, $proveedor->id);
            return $this->showOne($proveedor, 201); 


    }
}
