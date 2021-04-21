<?php

namespace App\Http\Controllers;

use App\RecepcionMercancia;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;

class RecepcionMercanciaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $recepcionReclamoDevolucion = RecepcionReclamoDevolucion::find( $request->get('rcdId') );
        $recepcionesMercancia = $recepcionReclamoDevolucion->recepcionMercancia;
        return view('recepcion-mercancia.index', compact('recepcionesMercancia', 'recepcionReclamoDevolucion'));   
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
     * @param  \App\RecepcionMercancia  $recepcionMercancia
     * @return \Illuminate\Http\Response
     */
    public function show(RecepcionMercancia $recepcionMercancia)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\RecepcionMercancia  $recepcionMercancia
     * @return \Illuminate\Http\Response
     */
    public function edit(RecepcionMercancia $recepcionMercancia)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\RecepcionMercancia  $recepcionMercancia
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RecepcionMercancia $recepcionMercancia)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\RecepcionMercancia  $recepcionMercancia
     * @return \Illuminate\Http\Response
     */
    public function destroy(RecepcionMercancia $recepcionMercancia)
    {
        //
    }
}
