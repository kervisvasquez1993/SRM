<?php

namespace App\Http\Controllers;

use App\ProduccionTransito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class ProduccionTransitoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $produccionTransitos = ProduccionTransito::all();

        return view('produccion-transito.index', compact('produccionTransitos'));
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

    public function salidaPuerto($id)
    {
        
        $produccionTransito = ProduccionTransito::where('id', $id)->get();
        $produccionTransito[0]->salida_puero_origen = 1;
        $produccionTransito[0]->save();
        return response()->json($produccionTransito[0]);
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
     * @param  \App\ProduccionTransito  $produccionTransito
     * @return \Illuminate\Http\Response
     */
    public function show(ProduccionTransito $produccionTransito)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ProduccionTransito  $produccionTransito
     * @return \Illuminate\Http\Response
     */
    public function edit(ProduccionTransito $produccionTransito)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProduccionTransito  $produccionTransito
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProduccionTransito $produccionTransito)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ProduccionTransito  $produccionTransito
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProduccionTransito $produccionTransito)
    {
        //
    }

    public function iniciarProduccion(Request $request, $id)
    {
        // dd($request->all(), $id);
        // $produccionTransito = ProduccionTransito::where('id', $id);
        $produccionTransito = ProduccionTransito::find( $id );
        $produccionTransito->inicio_produccion = true;
        $produccionTransito->save();

        $produccionTransitos = ProduccionTransito::all();

        Session::flash('message', 'Se ha iniciado la producción exitosamente.');
        Session::flash('class', 'success');

        // return view('produccion-transito.index', compact('produccionTransitos'));
        return redirect()->action('ProduccionTransitoController@index', compact('produccionTransitos'));


    }

}
