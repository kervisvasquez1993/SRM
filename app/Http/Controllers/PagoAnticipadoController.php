<?php

namespace App\Http\Controllers;

use App\PagoAnticipado;
use App\ProduccionTransito;
use Illuminate\Http\Request;

class PagoAnticipadoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   
        $produccionTransito = ProduccionTransito::find( $request->get('produccion-transito-id') );
        $pagos = PagoAnticipado::all();
        // dd($produccionTransito);
        return view('pago-anticipado.index', compact('pagos', 'produccionTransito'));
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
     * @param  \App\PagoAnticipado  $pagoAnticipado
     * @return \Illuminate\Http\Response
     */
    public function show(PagoAnticipado $pagoAnticipado)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PagoAnticipado  $pagoAnticipado
     * @return \Illuminate\Http\Response
     */
    public function edit(PagoAnticipado $pagoAnticipado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PagoAnticipado  $pagoAnticipado
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PagoAnticipado $pagoAnticipado)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PagoAnticipado  $pagoAnticipado
     * @return \Illuminate\Http\Response
     */
    public function destroy(PagoAnticipado $pagoAnticipado)
    {
        //
    }
}
