<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use App\ProduccionTransito;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use Symfony\Component\HttpFoundation\Response;

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
        
         if($request->fin_produccion == 1 && $produccionTransito->inicio_produccion === 0)
         {
               return $this->errorResponse('No Puede Finalizar la Proudccion si aun no la inicia', Response::HTTP_BAD_REQUEST);                                                   
         }

        if($request->inicio_produccion == 0 && $produccionTransito->fin_produccion == 1)
        {
            return $this->errorResponse('ya finalizo la produccion no puede desmarcar inicio de produccion', Response::HTTP_BAD_REQUEST);        
        }   
        if($request->pago_balance == 1  && $produccionTransito->pagos_anticipados == 0 )
        {
            return $this->errorResponse('Debe agregar antes un pago anticipado  pago de balance', Response::HTTP_BAD_REQUEST);        
        }   
        
        if( $request->salida_puero_origen == 1
            && $produccionTransito->pagos_anticipados == 0 
            && $produccionTransito->inicio_produccion == 0 
            && $produccionTransito->fin_produccion == 0
            && $produccionTransito->pago_balance == 0
            && $produccionTransito->transito_nacionalizacion == 0)
            {
                return $this->errorResponse('Debe tener todos los servicios finalizado', Response::HTTP_BAD_REQUEST);    
            }
        
      



        $produccionTransito->update($request->all());
        $produccionTransito->save();
        return $produccionTransito;
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
