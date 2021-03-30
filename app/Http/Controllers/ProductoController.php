<?php

namespace App\Http\Controllers;

use App\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   
        $id_proveedor = $request->query('id_proveedor');
        $productos = Producto::all();
        return view('producto.index', compact('productos', 'id_proveedor'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {   
        $id_proveedor = $request->query('id_proveedor');
        return view('producto.create', compact('id_proveedor'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $id_proveedor = $request->query('id_proveedor');

        $data = $request->validate([
            'name' => 'required',
            'marca' => 'required',
            'codigo' => 'required',
            'codigo-hs' => 'required',
            'descripcion' => 'required',
            'vida-util' => 'required|numeric',
            'totalpcs' => 'required|numeric',
            'pcs-empaque-unitario' => 'required|numeric',
            'pcs-empaque-interno' => 'required|numeric',
            'pcs-carton' => 'required|numeric',
            'largo-carton' => 'required|numeric',
            'alto-carton' => 'required|numeric',
            'ancho-carton' => 'required|numeric',
            'cbm' => 'required|numeric',
            'peso-neto' => 'required|numeric',
            'peso-bruto' => 'required|numeric',
            'total-cbm' => 'required|numeric',
            'total-peso-neto' => 'required|numeric',
            'total-peso-bruto' => 'required|numeric',
            'total-ctn' => 'required|numeric',
            'corregido-total-pcs' => 'required|numeric',
        ]);

        $producto = new Producto();

        $producto->proveedor_id = $id_proveedor;
        $producto->product_name = $data['name'] ;
        $producto->brand = $data['marca'];
        $producto->product_code = $data['codigo'];
        $producto->hs_code = $data['codigo-hs'];
        $producto->description = $data['descripcion'];
        $producto->shelf_life = $data['vida-util'];
        $producto->total_pcs = $data['totalpcs'];
        $producto->pcs_unit = $data['pcs-empaque-unitario'];
        $producto->pcs_inner_box = $data['pcs-empaque-interno'];
        $producto->pcs_ctn = $data['pcs-carton'];
        $producto->ctn_packing_size_l = $data['largo-carton'];
        $producto->ctn_packing_size_h = $data['alto-carton'];
        $producto->ctn_packing_size_w = $data['ancho-carton'];
        $producto->cbm = $data['cbm'];
        $producto->n_w_ctn = $data['peso-neto'];
        $producto->g_w_ctn = $data['peso-bruto'];
        $producto->total_cbm = $data['total-cbm'];
        $producto->total_n_w = $data['total-peso-neto'];
        $producto->total_g_w = $data['total-peso-bruto'];
        $producto->total_ctn = $data['total-ctn'];
        $producto->corregido_total_pcs = $data['corregido-total-pcs'];

        $producto->save();


        // dd($request->all());

        return redirect()->action('ProductoController@index', compact('id_proveedor'));

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function show(Producto $producto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function edit(Producto $producto)
    {
        
        return view('producto.edit', compact('producto'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Producto $producto)
    {
        $data = $request->validate([
            'name' => 'required',
            'marca' => 'required',
            'codigo' => 'required',
            'codigo-hs' => 'required',
            'descripcion' => 'required',
            'vida-util' => 'required|numeric',
            'totalpcs' => 'required|numeric',
            'pcs-empaque-unitario' => 'required|numeric',
            'pcs-empaque-interno' => 'required|numeric',
            'pcs-carton' => 'required|numeric',
            'largo-carton' => 'required|numeric',
            'alto-carton' => 'required|numeric',
            'ancho-carton' => 'required|numeric',
            'cbm' => 'required|numeric',
            'peso-neto' => 'required|numeric',
            'peso-bruto' => 'required|numeric',
            'total-cbm' => 'required|numeric',
            'total-peso-neto' => 'required|numeric',
            'total-peso-bruto' => 'required|numeric',
            'total-ctn' => 'required|numeric',
            'corregido-total-pcs' => 'required|numeric',
        ]);
        $producto->proveedor_id = $request['proveedor_id'];
        $producto->product_name = $data['name'] ;
        $producto->brand = $data['marca'];
        $producto->product_code = $data['codigo'];
        $producto->hs_code = $data['codigo-hs'];
        $producto->description = $data['descripcion'];
        $producto->shelf_life = $data['vida-util'];
        $producto->total_pcs = $data['totalpcs'];
        $producto->pcs_unit = $data['pcs-empaque-unitario'];
        $producto->pcs_inner_box = $data['pcs-empaque-interno'];
        $producto->pcs_ctn = $data['pcs-carton'];
        $producto->ctn_packing_size_l = $data['largo-carton'];
        $producto->ctn_packing_size_h = $data['alto-carton'];
        $producto->ctn_packing_size_w = $data['ancho-carton'];
        $producto->cbm = $data['cbm'];
        $producto->n_w_ctn = $data['peso-neto'];
        $producto->g_w_ctn = $data['peso-bruto'];
        $producto->total_cbm = $data['total-cbm'];
        $producto->total_n_w = $data['total-peso-neto'];
        $producto->total_g_w = $data['total-peso-bruto'];
        $producto->total_ctn = $data['total-ctn'];
        $producto->corregido_total_pcs = $data['corregido-total-pcs'];
        $producto->save();
        return back()->with('flash', 'Actualizado correctamente');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Producto $producto)
    {
        //
    }
}
