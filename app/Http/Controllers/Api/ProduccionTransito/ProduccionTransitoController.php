<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use App\ProduccionTransito;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;

class ProduccionTransitoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $producionTransito = ProduccionTransito::all();

        return $this->showAll($producionTransito);
    }


    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ProduccionTransito  $produccionTransito
     * @return \Illuminate\Http\Response
     */
    public function show(ProduccionTransito $produccionTransito)
    {
        //
    }

    public function update(Request $request, ProduccionTransito $produccionTransito)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ProduccionTransito  $produccionTransito
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProduccionTransito $produccionTransito)
    {
        //
    }
}
