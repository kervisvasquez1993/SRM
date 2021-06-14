<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use App\Pago;
use Carbon\Carbon;
use App\ProduccionTransito;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Storage;

class ProduccionTransitoPagoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $produccionTransito = ProduccionTransito::findOrFail($request->produccion_transito_id);
        return  $this->showAll($produccionTransito->pagos);
        
    }

    public function store(Request $request)
    {
        $produccionTransitoId = ProduccionTransito::findOrFail($request->produccion_transito_id);
        
        if($produccionTransitoId->pagos)
        {
            $tipo = "Pago Restante";    

        }
        else
        {
            $tipo = "Pago Anticipado";
        }
        $pago = new Pago();
        $pago->produccion_transito_id = $request->produccion_transito_id;
        $pago->user_id = Auth::user()->id;
        $pago->titulo = $request->titulo;
        $pago->monto = $request->monto;
        $pago->url_archivo_factura = $request->url_archivo_factura->store('factura-pago');
        $pago->tipo = $tipo;
        $pago->fecha = Carbon::now();
        $pago->save();
        return $this->showOne($pago);
    }

    public function show(Pago $pago)
    {
        return $this->showOne($pago);
    }

    public function update(Request $request, Pago $pago)
    {
        $pago->update($request->all());
        $pago->save();
        return $this->showOne($pago);
    }

    public function destroy(Pago $pago)
    {
        

        Storage::delete($pago->url_archivo_factura);
        $pago->delete();
        return $this->showOne($pago);
    }
}
