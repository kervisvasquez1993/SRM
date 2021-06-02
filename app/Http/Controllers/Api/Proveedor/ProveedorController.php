<?php

namespace App\Http\Controllers\Api\Proveedor;

use App\Tarea;
use App\Proveedor;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use App\Http\Resources\TareaProveedor;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;


class ProveedorController extends ApiController
{
    
    public function indexTareaProveedor($tarea_id)
    {
        $tarea = Tarea::findOrFail($tarea_id);
        $proveedores = $tarea->proveedor;
        /* return $this->showAllResources($proveedores); */
        return new TareaProveedor($tarea);
    }
    
    public function __construct()
    {
       $this->middleware('comprador');
    }

    public function store(Request $request)
    {
        
        
        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
            'pais'   => 'required',
            'ciudad' =>  'required',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }
        
        
        $proveedorExist = Proveedor::where('nombre', strtoupper($request->nombre))->where('pais', $request->pais)->first();
        
            if($proveedorExist):
                
                if(!(Tarea::findOrFail($request->tarea_id)));
                
                $this->pivotTareaProveedor($request->tarea_id, $proveedorExist->id); 
                return $this->successMensaje("Se registro Empresa Existente a esta nueva Tarea", 201);
                // informacion asociada a la tabla pivot
                
            else:
                if(!(Tarea::findOrFail($request->tarea_id)));
                $id_tarea = $request->tarea_id;
                $proveedor = new Proveedor();
                $proveedor->nombre = $request['nombre'];
                $proveedor->pais   = strtoupper($request['pais']);
                $proveedor->ciudad = $request['ciudad'];
                $proveedor->distrito = $request['distrito'];
                $proveedor->address = $request['address'];
                $proveedor->contacto = $request['contacto'];
                $proveedor->telefono = $request['telefono'];
                $proveedor->email = $request['email'];
                $proveedor->descripcion = $request['descripcion'];
                $proveedor->save();
                // informacion asociada a la tabla pivot
                $this->pivotTareaProveedor($id_tarea, $proveedor->id); 
                return $this->showOne($proveedor, 201);
            endif;
           
            
    }


    public function pivotTareaProveedor($id_tarea, $id_proveedor)
    {
            
            $pivotExit = PivotTareaProveeder::where('tarea_id', $id_tarea)->where('proveedor_id', $id_proveedor)->first();

            if(!$pivotExit):
            $pivotTareaProveedor = new PivotTareaProveeder();
            $pivotTareaProveedor->tarea_id = $id_tarea;
            $pivotTareaProveedor->proveedor_id = $id_proveedor;
            $pivotTareaProveedor->iniciar_negociacion = false;
            $pivotTareaProveedor->iniciar_arte = false;
            $pivotTareaProveedor->iniciar_produccion = false;
            $pivotTareaProveedor->save();
            return $this->successMensaje("Nueva pivot", 201);

            endif;
    }

    public function update(Request $request, Proveedor $proveedor)
    {
        
    }

}
