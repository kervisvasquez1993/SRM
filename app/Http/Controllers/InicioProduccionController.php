<?php

namespace App\Http\Controllers;

use App\InicioProduccion;
use App\ProduccionTransito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class InicioProduccionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $produccionTransito = ProduccionTransito::find( $request->get('produccionTransitoId') );
        $inicioProducciones = InicioProduccion::all();

        return view('inicio-produccion.index', compact('inicioProducciones', 'produccionTransito'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $produccionTransito = ProduccionTransito::find( $request->get('id_produccion_transito') );
        return view('inicio-produccion.create', compact('produccionTransito'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $produccionTransitoId = $request->get('id_produccion_transito');

        $data = $request->validate([
            'titulo' => 'required',
            'descripcion' => 'required',
        ]);
        
        $inicioProduccion = new InicioProduccion();

        $inicioProduccion->produccion_transito_id = $produccionTransitoId;
        $inicioProduccion->titulo = $data['titulo'];
        $inicioProduccion->descripcion = $data['descripcion'];
        // TODO: Add logic to set here the user who create the incidence
        $inicioProduccion->user_id = Auth::user()->id;;

        $inicioProduccion->save();

        Session::flash('message', 'Incidencia creada exitosamente.');
        Session::flash('class', 'success');
        return redirect()->action('InicioProduccionController@index', compact('produccionTransitoId'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\InicioProduccion  $inicioProduccion
     * @return \Illuminate\Http\Response
     */
    public function show(InicioProduccion $inicioProduccion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\InicioProduccion  $inicioProduccion
     * @return \Illuminate\Http\Response
     */
    public function edit(InicioProduccion $inicioProduccion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\InicioProduccion  $inicioProduccion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, InicioProduccion $inicioProduccion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\InicioProduccion  $inicioProduccion
     * @return \Illuminate\Http\Response
     */
    public function destroy(InicioProduccion $inicioProduccion)
    {
        $inicioProduccion->delete();

        return $inicioProduccion;
    }
}
