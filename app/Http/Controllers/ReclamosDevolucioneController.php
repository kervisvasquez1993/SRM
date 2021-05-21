<?php

namespace App\Http\Controllers;

use App\ReclamosDevolucione;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class ReclamosDevolucioneController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $recepcionReclamoDevolucion = RecepcionReclamoDevolucion::find( $request->get('rcdId') );
        $reclamosDevoluciones = $recepcionReclamoDevolucion->reclamoDevolucion;
        return view('reclamo-devolucion.index', compact('reclamosDevoluciones', 'recepcionReclamoDevolucion'));   

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $rcdId =  $request->get('rcdId');
        return view('reclamo-devolucion.create', compact('rcdId'));
    }
    public function store(Request $request)
    {
        $rcdId =  $request->get('rcdId');

        $data = $request->validate([
            'titulo' => 'required',
            'descripcion' => 'required',
        ]);

        $reclamoDevolucion = new ReclamosDevolucione();
        $reclamoDevolucion->recepcion_reclamo_devolucion_id = $rcdId;
        $reclamoDevolucion->titulo = $data['titulo'];
        $reclamoDevolucion->descripcion = $data['descripcion'];
        $reclamoDevolucion->user_id = Auth::user()->id;
        $reclamoDevolucion->save();

        Session::flash('message', 'Incidencia de Reclamo/Devolución creada exitosamente.');
        Session::flash('class', 'success');
        
        return redirect()->action('ReclamosDevolucioneController@index', compact('rcdId'));
    }

    
    public function show(ReclamosDevolucione $reclamosDevolucione)
    {
        //
    }

    public function edit(Request $request, $id)
    {
        $rcdId =  $request->get('rcdId');
        $reclamoDevolucion = ReclamosDevolucione::findOrFail($id);


        return view('reclamo-devolucion.edit', compact('reclamoDevolucion', 'rcdId'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ReclamosDevolucione  $reclamosDevolucione
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $reclamoDevolucion = ReclamosDevolucione::findOrFail($id);

        $rcdId =  $request->get('rcdId');

        $data = $request->validate([
            'titulo' => 'required',
            'descripcion' => 'required',
        ]);

        $reclamoDevolucion->titulo = $data['titulo'];
        $reclamoDevolucion->descripcion = $data['descripcion'];

        $reclamoDevolucion->save();

        Session::flash('message', 'Incidencia de Reclamo/Devolucion editada exitosamente.');
        Session::flash('class', 'success');

        return redirect()->action('ReclamosDevolucioneController@index', compact('rcdId'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ReclamosDevolucione  $reclamosDevolucione
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {   
        $reclamoDevolucion = ReclamosDevolucione::findOrFail($id);
        $rcdId =  $request->get('rcdId');
        $reclamoDevolucion->delete();

        Session::flash('message', 'Incidencia de Reclamo/Devolución eliminada exitosamente.');
        Session::flash('class', 'warning');

        return redirect()->action('ReclamosDevolucioneController@index', compact('rcdId'));
    }
}
