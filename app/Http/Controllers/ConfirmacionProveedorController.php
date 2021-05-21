<?php

namespace App\Http\Controllers;

use App\Arte;
use Illuminate\Http\Request;
use App\ConfirmacionProveedor;
use Illuminate\Support\Facades\Auth;

class ConfirmacionProveedorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $arte = Arte::find( $request->get('arte') );
        $confirmacionProveedores = $arte->confirmacionProveedor->where('enabled', 1);

        return view('confirmacion-proveedor.index', compact('arte', 'confirmacionProveedores'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all()['params'];
        $confirmacionProveedor = new ConfirmacionProveedor();

        $confirmacionProveedor->titulo = $data['titulo'];
        $confirmacionProveedor->descripcion = $data['descripcion'];
        $confirmacionProveedor->user_id = Auth::user()->id;
        $confirmacionProveedor->arte_id = $data['arte'];
        $confirmacionProveedor->save();
        $user = $confirmacionProveedor->user;
         
        return [ 'incidencia' => $confirmacionProveedor, 'user' => $user]; 
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ConfirmacionProveedor  $confirmacionProveedor
     * @return \Illuminate\Http\Response
     */
    public function show(ConfirmacionProveedor $confirmacionProveedor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ConfirmacionProveedor  $confirmacionProveedor
     * @return \Illuminate\Http\Response
     */
    public function edit(ConfirmacionProveedor $confirmacionProveedor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ConfirmacionProveedor  $confirmacionProveedor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ConfirmacionProveedor $confirmacionProveedor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ConfirmacionProveedor  $confirmacionProveedor
     * @return \Illuminate\Http\Response
     */
    public function destroy(ConfirmacionProveedor $confirmacionProveedor)
    {
        $confirmacionProveedor->enabled = false;
        $confirmacionProveedor->save();

        return $confirmacionProveedor;
    }
}
