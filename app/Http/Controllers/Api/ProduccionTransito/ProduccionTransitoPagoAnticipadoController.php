<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use App\PagoAnticipado;
use App\ProduccionTransito;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;

class ProduccionTransitoPagoAnticipadoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        
        $produccionTransito = ProduccionTransito::findOrFail($request->produccion_transito_id);
        return $this->showOne($produccionTransito->pagosAnticipados);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $pagoAnticipado = new PagoAnticipado();
        $pagoAnticipado->produccion_transito_id = $request->produccion_transito_id;
        $pagoAnticipado->user_id = auth()->user()->id;
        $pagoAnticipado->titulo = $request->titulo;
        $pagoAnticipado->porcentaje = $request->porcentaje;
        $pagoAnticipado->file_pago = $request->file_pago;
        $pagoAnticipado->fecha_pago = Carbon::now();
        $pagoAnticipado->descripcion = $request->descripcion;
        $pagoAnticipado->save();
        return $this->showOne($pagoAnticipado); 

    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $pago_anticipado_id)
    {
        $pago_anticipado = PagoAnticipado::findOrFail($pago_anticipado_id);
        $pago_anticipado->update($request->all());
        $pago_anticipado->save();
        return $pago_anticipado;        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($pago_anticipado_id)
    {
        $pago_anticipado = PagoAnticipado::findOrFail($pago_anticipado_id);
        $pago_anticipado->delete();
        return $this->showOne($pago_anticipado);
    }
}
