<?php

namespace App\Http\Controllers;

use App\PagoBalance;
use App\ProduccionTransito;
use Illuminate\Http\Request;

class PagoBalanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $produccionTransito = ProduccionTransito::find( $request->get('produccionTransitoId') );
        $pagos = $produccionTransito->pagosBalance;

        return view('pago-balance.index', compact('pagos', 'produccionTransito'));

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $idProduccionTransito = $request->query('id_produccion_transito');
        return view('pago-balance.create', compact('idProduccionTransito'));
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
     * @param  \App\PagoBalance  $pagoBalance
     * @return \Illuminate\Http\Response
     */
    public function show(PagoBalance $pagoBalance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PagoBalance  $pagoBalance
     * @return \Illuminate\Http\Response
     */
    public function edit(PagoBalance $pagoBalance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PagoBalance  $pagoBalance
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PagoBalance $pagoBalance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PagoBalance  $pagoBalance
     * @return \Illuminate\Http\Response
     */
    public function destroy(PagoBalance $pagoBalance)
    {
        //
    }
}
