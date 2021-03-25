<?php

namespace App\Http\Controllers;

use App\Arte;
use App\ValidacionBoceto;
use Illuminate\Http\Request;

class ValidacionBocetoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $arte = Arte::find( $request->get('arte') );
        $validacionBocetos = $arte->validacionBoceto->where('enabled', 1);

        return view('validacion-boceto.index', compact('arte', 'validacionBocetos'));
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
        $data = $request->all()['params'];
        $validacionBoceto = new ValidacionBoceto();

        $validacionBoceto->titulo = $data['titulo'];
        $validacionBoceto->descripcion = $data['descripcion'];
        // TODO: Add the LOGGED user here, currently not implemented
        $validacionBoceto->user_id = 1;
        $validacionBoceto->arte_id = $data['arte'];
        $validacionBoceto->save();
        $user = $validacionBoceto->user;
         
        return [ 'incidencia' => $validacionBoceto, 'user' => $user];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ValidacionBoceto  $validacionBoceto
     * @return \Illuminate\Http\Response
     */
    public function show(ValidacionBoceto $validacionBoceto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ValidacionBoceto  $validacionBoceto
     * @return \Illuminate\Http\Response
     */
    public function edit(ValidacionBoceto $validacionBoceto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ValidacionBoceto  $validacionBoceto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ValidacionBoceto $validacionBoceto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ValidacionBoceto  $validacionBoceto
     * @return \Illuminate\Http\Response
     */
    public function destroy(ValidacionBoceto $validacionBoceto)
    {
        $validacionBoceto->enabled = false;
        $validacionBoceto->save();

        return $validacionBoceto;
    }
}
