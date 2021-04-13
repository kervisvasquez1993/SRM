<?php

namespace App\Http\Controllers;

use App\PagoBalance;
use App\ProduccionTransito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

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
    public function create(Request $request)
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
        // dd($request->all(), $request->get('pago_completo'));
        $produccionTransitoId = $request->query('id_produccion_transito');
        
        $data = $request->validate([
            'titulo' => 'required',
            'total' => 'required|numeric',
            'pathfile' => 'required',
            'descripcion' => 'required',
            'fecha_pago' => 'required|date'
        ]);

        $pago_balance = new PagoBalance();

        $pago_balance->produccion_transito_id = $produccionTransitoId;
        $pago_balance->titulo = $data['titulo'];
        $pago_balance->monto_total = $data['total'];
        $pago_balance->file_pago = $data['pathfile'];
        $pago_balance->descripcion = $data['descripcion'];
        $pago_balance->fecha_pago = $data['fecha_pago'];
        $pago_balance->pago_completo = $request->get('pago_completo') ? true : false;

        $pago_balance->save();

        // Upodate ProduccionTransito status
        $produccionTransito = ProduccionTransito::where( 'id', $produccionTransitoId )->update([ 'pago_balance' => 1]);

        Session::flash('message', 'Pago Balance creado exitosamente.');
        Session::flash('class', 'success');
        
        return redirect()->action('PagoBalanceController@index', compact('produccionTransitoId'));
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
