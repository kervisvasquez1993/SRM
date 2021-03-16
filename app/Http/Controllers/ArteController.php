<?php

namespace App\Http\Controllers;

use App\Arte;
use App\Estatus;
use Illuminate\Http\Request;

class ArteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $artes = Arte::all();
        $estatus = Estatus::all();
        return view('arte.index', compact('artes', 'estatus'));
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Arte  $arte
     * @return \Illuminate\Http\Response
     */
    public function show(Arte $arte)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Arte  $arte
     * @return \Illuminate\Http\Response
     */
    public function edit(Arte $arte)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Arte  $arte
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Arte $arte)
    {
        $data = $request->all()['params'];
        $arte->creacion_fichas = $data['creacion_ficha'];
        $arte->validacion_fichas = $data['validacion_ficha'];
        $arte->creacion_boceto = $data['creacion_boceto'];
        $arte->validacion_boceto = $data['validacion_boceto'];
        $arte->confirmacion_proveedor = $data['confirmacion_proveedor'];
        $arte->save();

        return Arte::where('id', $arte->id)->first();  

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Arte  $arte
     * @return \Illuminate\Http\Response
     */
    public function destroy(Arte $arte)
    {
        //
    }
}
