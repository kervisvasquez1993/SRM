<?php

namespace App\Http\Controllers;

use App\Arte;
use App\ValidacionFicha;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ValidacionFichaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $arte = Arte::find( $request->get('arte') );
        $validacionFichas = $arte->validacionFicha->where('enabled', 1);

        return view('validacion-ficha.index', compact('arte', 'validacionFichas'));
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
        $validacionFicha = new ValidacionFicha();

        $validacionFicha->titulo = $data['titulo'];
        $validacionFicha->descripcion = $data['descripcion'];
        $validacionFicha->user_id = Auth::user()->id;
        $validacionFicha->arte_id = $data['arte'];
        $validacionFicha->save();
        $user = $validacionFicha->user;
         
        return [ 'incidencia' => $validacionFicha, 'user' => $user];        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ValidacionFicha  $validacionFicha
     * @return \Illuminate\Http\Response
     */
    public function show(ValidacionFicha $validacionFicha)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ValidacionFicha  $validacionFicha
     * @return \Illuminate\Http\Response
     */
    public function edit(ValidacionFicha $validacionFicha)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ValidacionFicha  $validacionFicha
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ValidacionFicha $validacionFicha)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ValidacionFicha  $validacionFicha
     * @return \Illuminate\Http\Response
     */
    public function destroy(ValidacionFicha $validacionFicha)
    {
        $validacionFicha->enabled = false;
        $validacionFicha->save();

        return $validacionFicha;        
    }
}
