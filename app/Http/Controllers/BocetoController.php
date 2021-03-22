<?php

namespace App\Http\Controllers;

use App\Arte;
use App\Boceto;
use Illuminate\Http\Request;

class BocetoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $arte = Arte::find( $request->get('arte') );
        $bocetos = $arte->boceto;
        // dd( $bocetos );

        return view('boceto.index', compact('bocetos'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // Create a new Boceto
        
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
     * @param  \App\Boceto  $boceto
     * @return \Illuminate\Http\Response
     */
    public function show(Boceto $boceto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Boceto  $boceto
     * @return \Illuminate\Http\Response
     */
    public function edit(Boceto $boceto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Boceto  $boceto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Boceto $boceto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Boceto  $boceto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Boceto $boceto)
    {
        //
    }
}
