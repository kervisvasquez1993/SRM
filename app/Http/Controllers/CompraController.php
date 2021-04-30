<?php

namespace App\Http\Controllers;

use App\Compra;
use App\Proveedor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;


class CompraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $id_proveedor = $request->query('id_proveedor');
        $proveedor = Proveedor::findOrFail($id_proveedor);

        return view('compras.index',compact('proveedor', 'id_proveedor'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $id_proveedor = $request->query('id_proveedor');
        $proveedor = Proveedor::findOrFail($id_proveedor);
        return view('compras.create',compact('proveedor', 'id_proveedor'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate(
            [
                'orden_compra' => 'required',
                'item' => 'required',
                'descripcion' => 'required',
                'registro_salud' => 'required', 
                'cantidad_pcs' => 'required',
                'total' => 'required',

            ]
        );

        $compra = new Compra();

        $compra->orden_compra = $data['orden_compra'];
        $compra->item = $data['item'];
        $compra->proveedor_id = $request->proveedor_id;
        $compra->descripcion = $data['descripcion'];
        $compra->registro_salud = $data['registro_salud'];
        $compra->total = $data['total'];
        $compra->save();
        Session::flash('message', 'Orden Añadida correctamente');
        Session::flash('class', 'success');
        return redirect()->action('ProveedorController@listaAprobado');

        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Compra  $compra
     * @return \Illuminate\Http\Response
     */
    public function show(Compra $compra)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Compra  $compra
     * @return \Illuminate\Http\Response
     */
    public function edit(Compra $compra)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Compra  $compra
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Compra $compra)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Compra  $compra
     * @return \Illuminate\Http\Response
     */
    public function destroy(Compra $compra)
    {
        //
    }
}
