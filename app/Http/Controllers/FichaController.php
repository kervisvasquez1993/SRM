<?php

namespace App\Http\Controllers;

use App\Arte;
use App\Ficha;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FichaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $arte = Arte::find( $request->get('arte') );
        $fichas = $arte->ficha->where('enabled', 1);

        return view('ficha.index', compact('arte', 'fichas'));
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
        $ficha = new Ficha();

        $ficha->titulo = $data['titulo'];
        $ficha->descripcion = $data['descripcion'];
        // TODO: Add the LOGGED user here, currently not implemented
        $ficha->user_id = Auth::user()->id;
        $ficha->arte_id = $data['arte'];
        $ficha->save();
        $user = $ficha->user;
         
        return [ 'incidencia' => $ficha, 'user' => $user];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Ficha  $ficha
     * @return \Illuminate\Http\Response
     */
    public function show(Ficha $ficha)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Ficha  $ficha
     * @return \Illuminate\Http\Response
     */
    public function edit(Ficha $ficha)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Ficha  $ficha
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ficha $ficha)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Ficha  $ficha
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ficha $ficha)
    {
        $ficha->enabled = false;
        $ficha->save();

        return $ficha;
    }
}
