<?php

namespace App\Http\Controllers;

use App\InspeccionCarga;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

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
    public function create(Request $request)
    {
        $rcdId =  $request->get('rcdId');
        return view('inspeccion-carga.create', compact('rcdId'));
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

        $inspeccionCarga = new InspeccionCarga();

        $inspeccionCarga->recepcion_reclamo_devolucion_id = $rcdId;
        $inspeccionCarga->titulo = $data['titulo'];
        $inspeccionCarga->descripcion = $data['descripcion'];
        $inspeccionCarga->user_id = Auth::user()->id;
        $inspeccionCarga->save();

        Session::flash('message', 'Incidencia de Inspecciión de Carga creada exitosamente.');
        Session::flash('class', 'success');

        return redirect()->action('InspeccionCargaController@index', compact('rcdId'));

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
    public function edit(Request $request, InspeccionCarga $inspeccionCarga)
    {
        $rcdId =  $request->get('rcdId');

        return view('inspeccion-carga.edit', compact('inspeccionCarga', 'rcdId'));
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
        $rcdId =  $request->get('rcdId');

        $data = $request->validate([
            'titulo' => 'required',
            'descripcion' => 'required',
        ]);

        $inspeccionCarga->titulo = $data['titulo'];
        $inspeccionCarga->descripcion = $data['descripcion'];

        $inspeccionCarga->save();

        Session::flash('message', 'Incidencia de Inspección de Carga editada exitosamente.');
        Session::flash('class', 'success');

        return redirect()->action('InspeccionCargaController@index', compact('rcdId'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\InspeccionCarga  $inspeccionCarga
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, InspeccionCarga $inspeccionCarga)
    {
        $rcdId =  $request->get('rcdId');

        $inspeccionCarga->delete();

        Session::flash('message', 'Incidencia de Inspección de Carga eliminada exitosamente.');
        Session::flash('class', 'warning');

        return redirect()->action('InspeccionCargaController@index', compact('rcdId'));
    }
}
