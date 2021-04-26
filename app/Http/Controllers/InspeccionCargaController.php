<?php

namespace App\Http\Controllers;

use App\InspeccionCarga;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;

class InspeccionCargaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $recepcionReclamoDevolucion = RecepcionReclamoDevolucion::find( $request->get('rcdId') );   
        $inspeccionesCarga = $recepcionReclamoDevolucion->inspeccionCarga;

        return view('inspeccion-carga.index', compact('inspeccionesCarga', 'recepcionReclamoDevolucion'));
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\InspeccionCarga  $inspeccionCarga
     * @return \Illuminate\Http\Response
     */
    public function show(InspeccionCarga $inspeccionCarga)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\InspeccionCarga  $inspeccionCarga
     * @return \Illuminate\Http\Response
     */
    public function edit(InspeccionCarga $inspeccionCarga)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\InspeccionCarga  $inspeccionCarga
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, InspeccionCarga $inspeccionCarga)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\InspeccionCarga  $inspeccionCarga
     * @return \Illuminate\Http\Response
     */
    public function destroy(InspeccionCarga $inspeccionCarga)
    {
        //
    }
}
