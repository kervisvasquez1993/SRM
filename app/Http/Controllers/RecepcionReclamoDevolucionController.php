<?php

namespace App\Http\Controllers;

use App\RecepcionReclamoDevolucion;
use Illuminate\Http\Request;

class RecepcionReclamoDevolucionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $recepcionReclamoDevolucion = RecepcionReclamoDevolucion::all();
        return view('reclamos-devoluciones.index', compact('recepcionReclamoDevolucion'));
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
     * @param  \App\RecepcionReclamoDevolucion  $recepcionReclamoDevolucion
     * @return \Illuminate\Http\Response
     */
    public function show(RecepcionReclamoDevolucion $recepcionReclamoDevolucion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\RecepcionReclamoDevolucion  $recepcionReclamoDevolucion
     * @return \Illuminate\Http\Response
     */
    public function edit(RecepcionReclamoDevolucion $recepcionReclamoDevolucion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\RecepcionReclamoDevolucion  $recepcionReclamoDevolucion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RecepcionReclamoDevolucion $recepcionReclamoDevolucion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\RecepcionReclamoDevolucion  $recepcionReclamoDevolucion
     * @return \Illuminate\Http\Response
     */
    public function destroy(RecepcionReclamoDevolucion $recepcionReclamoDevolucion)
    {
        //
    }
}
