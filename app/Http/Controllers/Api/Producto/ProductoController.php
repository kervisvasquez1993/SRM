<?php

namespace App\Http\Controllers\Api\Producto;

use App\Producto;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use App\Imports\ProductosImport;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ProductoController extends ApiController
{
    public function index(Request $request)
    {
        $negociacion_id = $request->pivot_tarea_proveedor;
        $productos = Producto::where('pivot_tarea_proveeder_id', $negociacion_id)->get();
        return $this->showAll($productos);
    }

    public function store(Request $request)
    {

       

        
        $pivot_tarea_proveedor_id = $request->pivot_tarea_proveedor;
        $validator = Validator::make($request->all(), [
            
            'hs_code' => 'required',
            'product_code' => 'required',
            'description' => 'required',
            'product_name_origin' => 'required',
            'brand' => 'required',
            'product_name' => 'required',
            'total_pcs' => 'required|numeric',
            'shelf_life' => 'required|numeric',
            'total_pcs' => 'required|numeric',
            'pcs_unit' => 'required|numeric',
            'pcs_inner_box' => 'required|numeric',
            'pcs_ctn' => 'required|numeric',
            'ctn_packing_size_l' => 'required|numeric',
            'ctn_packing_size_w' => 'required|numeric',
            'ctn_packing_size_h' => 'required|numeric',
            'cbm' => 'required|numeric',
            'n_w_ctn' => 'required|numeric',
            'g_w_ctn' => 'required|numeric',
            'total_ctn' => 'required|numeric',
            'corregido_total_pcs' => 'required|numeric',
            'total_cbm' => 'required|numeric',
            'total_n_w' => 'required|numeric',
            'total_g_w' => 'required|numeric',
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }
        

        $producto = new Producto();
        $producto->pivot_tarea_proveeder_id = $pivot_tarea_proveedor_id;
        $producto->hs_code = $request->hs_code;
        $producto->product_code = $request->product_code;
        $producto->brand = $request->brand;
        $producto->product_name = $request->product_name;
        $producto->product_name_origin = $request->product_name_origin;
        $producto->description = $request->description;
        $producto->shelf_life = $request->shelf_life;
        $producto->total_pcs = $request->total_pcs;
        $producto->pcs_unit = $request->pcs_unit;
        $producto->pcs_inner_box = $request->pcs_inner_box;
        $producto->pcs_ctn = $request->pcs_ctn;
        $producto->ctn_packing_size_l = $request->ctn_packing_size_l;
        $producto->ctn_packing_size_w = $request->ctn_packing_size_w;
        $producto->ctn_packing_size_h = $request->ctn_packing_size_h;    
        $producto->cbm = $request->cbm;
        $producto->n_w_ctn = $request->n_w_ctn;
        $producto->g_w_ctn = $request->g_w_ctn;
        $producto->total_ctn = $request->total_ctn;
        $producto->corregido_total_pcs = $request->corregido_total_pcs;
        $producto->total_cbm = $request->total_cbm;
        $producto->total_n_w = $request->total_n_w;
        $producto->total_g_w = $request->total_g_w;
        $producto->save();

        return $this->showOne($producto);
    }


    public function update(Request $request , Producto $producto)
    {
        
        
        if(!(auth()->user()->rol == 'coordinador') && !(auth()->user()->rol == 'comprador') )
        {
            return $this->errorResponse('No Tiene permiso para realizar esta accion', Response::HTTP_UNAUTHORIZED);
        }

        $validator = Validator::make($request->all(), [
            
            'hs_code' => 'required',
            'product_code' => 'required',
            'description' => 'required',
            'brand' => 'required',
            'product_name' => 'required',
            'total_pcs' => 'required|numeric',
            'shelf_life' => 'required|numeric',
            'total_pcs' => 'required|numeric',
            'pcs_unit' => 'required|numeric',
            'pcs_inner_box' => 'required|numeric',
            'pcs_ctn' => 'required|numeric',
            'ctn_packing_size_l' => 'required|numeric',
            'ctn_packing_size_w' => 'required|numeric',
            'ctn_packing_size_h' => 'required|numeric',
            'cbm' => 'required|numeric',
            'n_w_ctn' => 'required|numeric',
            'g_w_ctn' => 'required|numeric',
            'total_ctn' => 'required|numeric',
            'corregido_total_pcs' => 'required|numeric',
            'total_cbm' => 'required|numeric',
            'total_n_w' => 'required|numeric',
            'total_g_w' => 'required|numeric',
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }
        $producto->update($request->all());
        $producto->save();
        return $this->showOne($producto);

    }

    public function delete(Producto $producto)
    {
        $producto->delete();
        return $this->showOne($producto);
    }

    public function importProduct( Request $request, PivotTareaProveeder $pivot_tarea_proveeder_id)
    {
        $archivo = $request->file('import');
        $id_pivot =  $pivot_tarea_proveeder_id->id;
        Excel::import(new ProductosImport($pivot_tarea_proveeder_id->id), $archivo);
        
        return response()->json('cargado');
        
    }
}
