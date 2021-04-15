<?php

namespace App\Http\Controllers;

use App\ProduccionTransito;
use Illuminate\Http\Request;
use App\TransitoNacionalizacion;
use Illuminate\Support\Facades\Session;

class TransitoNacionalizacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $produccionTransito = ProduccionTransito::find( $request->get('produccionTransitoId') );
        $transitos = $produccionTransito->transitosNacionalizacion;

        return view('transito-nacionalizacion.index', compact('transitos', 'produccionTransito'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $idProduccionTransito = $request->query('id_produccion_transito');
        return view('transito-nacionalizacion.create', compact('idProduccionTransito'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request->all(), $request->query('id_produccion_transito'));
        $produccionTransitoId = $request->query('id_produccion_transito');
        $data = $request->validate([
            'titulo' => 'required',
            'descripcion' => 'required',
        ]);

        $transitoNacionalizacion = new TransitoNacionalizacion();

        $transitoNacionalizacion->produccion_transito_id = $produccionTransitoId;
        $transitoNacionalizacion->titulo = $data['titulo'];
        $transitoNacionalizacion->descripcion = $data['descripcion'];

        $transitoNacionalizacion->save();

        Session::flash('message', 'Transito creado exitosamente.');
        Session::flash('class', 'success');

        return redirect()->action('TransitoNacionalizacionController@index', compact('produccionTransitoId'));

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\TransitoNacionalizacion  $transitoNacionalizacion
     * @return \Illuminate\Http\Response
     */
    public function show(TransitoNacionalizacion $transitoNacionalizacion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\TransitoNacionalizacion  $transitoNacionalizacion
     * @return \Illuminate\Http\Response
     */
    public function edit(TransitoNacionalizacion $transitoNacionalizacion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\TransitoNacionalizacion  $transitoNacionalizacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TransitoNacionalizacion $transitoNacionalizacion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TransitoNacionalizacion  $transitoNacionalizacion
     * @return \Illuminate\Http\Response
     */
    public function destroy(TransitoNacionalizacion $transitoNacionalizacion)
    {
        //
    }
}
