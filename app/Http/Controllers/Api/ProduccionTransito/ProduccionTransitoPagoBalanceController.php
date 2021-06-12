<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use App\PagoBalance;
use App\PagoAnticipado;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ApiController;
use App\ProduccionTransito;

class ProduccionTransitoPagoBalanceController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $pagoAnticipado = PagoAnticipado::findOrFail($request->pago_anticipado_id);
        if($pagoAnticipado->pagoBalance) 
        {  
            return  $pagoAnticipado->pagoBalance;
         }
        else
        { 
            return $this->errorResponse('Aun no se Agrega pago anticipado', 404) ; 
        }
       
    }

    public function store(Request $request)
    {
       
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
