<?php

namespace App\Http\Controllers;

use App\RecepcionMercancia;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use Illuminate\Support\Facades\Session;

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
    public function create(Request $request)
    {
        $rcdId =  $request->get('rcdId');
        return view('recepcion-mercancia.create', compact('rcdId'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rcdId =  $request->get('rcdId');
        
        $data = $request->validate([
            'titulo' => 'required',
            'descripcion' => 'required',
        ]);

        $recepcionMercancia = new RecepcionMercancia();
        $recepcionMercancia->recepcion_reclamo_devolucion_id = $rcdId;
        $recepcionMercancia->titulo = $data['titulo'];
        $recepcionMercancia->descripcion = $data['descripcion'];

        $recepcionMercancia->save();

        Session::flash('message', 'Incidencia de Recepción de Mercancia creada exitosamente.');
        Session::flash('class', 'success');

        return redirect()->action('RecepcionMercanciaController@index', compact('rcdId'));
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
    public function edit(Request $request, RecepcionMercancia $recepcionMercancia)
    {
        $rcdId =  $request->get('rcdId');

        return view('recepcion-mercancia.edit', compact('recepcionMercancia', 'rcdId'));
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
        $rcdId =  $request->get('rcdId');

        $data = $request->validate([
            'titulo' => 'required',
            'descripcion' => 'required',
        ]);

        $recepcionMercancia->titulo = $data['titulo'];
        $recepcionMercancia->descripcion = $data['descripcion'];

        $recepcionMercancia->save();

        Session::flash('message', 'Incidencia de Recepción de Mercancia editada exitosamente.');
        Session::flash('class', 'success');

        return redirect()->action('RecepcionMercanciaController@index', compact('rcdId'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\RecepcionMercancia  $recepcionMercancia
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, RecepcionMercancia $recepcionMercancia)
    {
        $rcdId =  $request->get('rcdId');
        
        $recepcionMercancia->delete();

        Session::flash('message', 'Incidencia de Recepción de Mercancia eliminada exitosamente.');
        Session::flash('class', 'warning');

        return redirect()->action('RecepcionMercanciaController@index', compact('rcdId'));

    }
}
