<?php

namespace App\Http\Controllers;

use App\FinProduccion;
use App\ProduccionTransito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class FinProduccionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $produccionTransito = ProduccionTransito::find( $request->get('produccionTransitoId') );
        $finProducciones = $produccionTransito->finProduccion;

        return view('fin-produccion.index', compact('finProducciones', 'produccionTransito'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $idProduccionTransito = $request->query('id_produccion_transito');
        return view('fin-produccion.create', compact('idProduccionTransito'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $produccionTransitoId = $request->query('id_produccion_transito');

        $data = $request->validate([
            'titulo' => 'required',
            'descripcion' => 'required',
        ]);

        $finProduccion = new FinProduccion();

        $finProduccion->produccion_transito_id = $produccionTransitoId;
        $finProduccion->titulo = $data['titulo'];
        $finProduccion->descripcion = $data['descripcion'];
        $finProduccion->user_id = Auth::user()->id;

        $finProduccion->save();

        Session::flash('message', 'Incidencia de Fin de Produccion creado exitosamente.');
        Session::flash('class', 'success');

        return redirect()->action('FinProduccionController@index', compact('produccionTransitoId'));


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\FinProduccion  $finProduccion
     * @return \Illuminate\Http\Response
     */
    public function show(FinProduccion $finProduccion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\FinProduccion  $finProduccion
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, FinProduccion $finProduccion)
    {
        $idProduccionTransito = $request->query('id_produccion_transito');

        return view('fin-produccion.edit',  compact('idProduccionTransito', 'finProduccion'));

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\FinProduccion  $finProduccion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FinProduccion $finProduccion)
    {
        $produccionTransitoId = $request->query('id_produccion_transito');

        $data = $request->validate([
            'titulo' => 'required',
            'descripcion' => 'required',
        ]);

        $finProduccion->titulo = $data['titulo'];
        $finProduccion->descripcion = $data['descripcion'];

        $finProduccion->save();

        Session::flash('message', 'Incidencia de Fin de Produccion editada exitosamente.');
        Session::flash('class', 'success');

        return redirect()->action('FinProduccionController@index', compact('produccionTransitoId'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\FinProduccion  $finProduccion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, FinProduccion $finProduccion)
    {
        $produccionTransitoId = $request->query('id_produccion_transito');

        $finProduccion->delete();

        Session::flash('message', 'Incidencia de Fin de Produccion eliminada exitosamente.');
        Session::flash('class', 'warning');

        return redirect()->action('FinProduccionController@index', compact('produccionTransitoId'));
    }
}
