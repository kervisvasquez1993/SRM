<?php

namespace App\Http\Controllers;

use App\Tarea;
use App\Proveedor;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProveedorController extends Controller
{
   

     public function __construct()
     {
        $this->middleware('comprador');
     }
     
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }


    public function store(Request $request)
    {
            $data = $request->validate([
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
            else:
                $aleatorio;
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
                $this->pivotTareaProveedor($id_tarea, $proveedor->id);
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
                $this->pivotTareaProveedor($id_tarea, $proveedor->id);
            endif;
            return back()->with('message', 'Se Añadio empresa correctamente');            
    }
    public function Negociar(Request $request)
    {
        
        Proveedor::where('id', $request['name'])->update(array('aprovado' => 1));

        return back()->with('message', 'La empresa se aprobo correctamente');
    }

    public function pivotTareaProveedor($id_tarea, $id_proveedor)
    {
            $pivotTareaProveedor = new PivotTareaProveeder();
            $pivotTareaProveedor->tarea_id = $id_tarea;
            $pivotTareaProveedor->proveedor_id = $id_proveedor;
            $pivotTareaProveedor->iniciar_negociacion = false;
            $pivotTareaProveedor->iniciar_arte = false;
            $pivotTareaProveedor->iniciar_produccion = false;
            $pivotTareaProveedor->save();
    }


    public function show(Proveedor $proveedor)
    {
        //
    }

    public function edit(Proveedor $proveedor)
    {
        //
    }

    public function update(Request $request, Proveedor $proveedor)
    {
        return "hola";
    }


    public function destroy(Proveedor $proveedor)
    {
        //
    }

    public function listaAprobado()
    {
        
        $aprobados = PivotTareaProveeder::all();    
        $userAut = Auth::user();  
        return view('proveedor.index',compact('aprobados', 'userAut'));
    }
}
