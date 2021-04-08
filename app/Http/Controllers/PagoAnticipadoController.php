<?php

namespace App\Http\Controllers;

use App\PagoAnticipado;
use App\ProduccionTransito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class PagoAnticipadoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   

        $produccionTransito = ProduccionTransito::find( $request->get('produccionTransitoId') );
        $pagos = $produccionTransito->pagosAnticipados;
        // dd($produccionTransito);
        return view('pago-anticipado.index', compact('pagos', 'produccionTransito'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {   
        $idProduccionTransito = $request->query('id_produccion_transito');
        return view('pago-anticipado.create', compact('idProduccionTransito'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request->all());

        $produccionTransitoId = $request->query('id_produccion_transito');

        $data = $request->validate([
            'titulo' => 'required',
            'total' => 'required|numeric',
            'porcentaje' => 'required|numeric|digits_between:1,100',
            'pathfile' => 'required',
            'descripcion' => 'required',
            'fecha_pago' => 'required|date'
        ]);

        $pagoAnticipado = new PagoAnticipado();

        $pagoAnticipado->produccion_transito_id = $produccionTransitoId;
        $pagoAnticipado->titulo = $data['titulo'];
        $pagoAnticipado->monto_total = $data['total'];
        $pagoAnticipado->porcentaje = $data['porcentaje'];
        $pagoAnticipado->file_pago = $data['pathfile'];
        $pagoAnticipado->descripcion = $data['descripcion'];
        $pagoAnticipado->fecha_pago = $data['fecha_pago'];

        $pagoAnticipado->save();

        // Upodate ProduccionTransito status
        $produccionTransito = ProduccionTransito::where( 'id', $produccionTransitoId )->update([ 'pagos_anticipados' => 1]);

        Session::flash('message', 'Pago Anticipado creado exitosamente.');
        Session::flash('class', 'success');

        return redirect()->action('PagoAnticipadoController@index', compact('produccionTransitoId'));


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
    public function edit(Request $request, PagoAnticipado $pagoAnticipado)
    {
        $idProduccionTransito = $request->query('id_produccion_transito');
        // dd($pagoAnticipado);
        return view('pago-anticipado.edit',  compact('idProduccionTransito', 'pagoAnticipado'));
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
        $produccionTransitoId = $request->query('id_produccion_transito');

        $data = $request->validate([
            'titulo' => 'required',
            'total' => 'required|numeric',
            'porcentaje' => 'required|numeric|digits_between:1,100',
            'pathfile' => 'required',
            'descripcion' => 'required',
            'fecha_pago' => 'required|date'
        ]);

        $pagoAnticipado->titulo = $data['titulo'];
        $pagoAnticipado->monto_total = $data['total'];
        $pagoAnticipado->porcentaje = $data['porcentaje'];
        $pagoAnticipado->file_pago = $data['pathfile'];
        $pagoAnticipado->descripcion = $data['descripcion'];
        $pagoAnticipado->fecha_pago = $data['fecha_pago'];

        $pagoAnticipado->save();

        Session::flash('message', 'Pago Anticipado modificado exitosamente.');
        Session::flash('class', 'success');

        return redirect()->action('PagoAnticipadoController@index', compact('produccionTransitoId'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PagoAnticipado  $pagoAnticipado
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, PagoAnticipado $pagoAnticipado)
    {

        // dd($request->all(), $pagoAnticipado);
        $produccionTransitoId = $request->query('id_produccion_transito');

        $pagoAnticipado->delete();

        Session::flash('message', 'Pago Anticipado eliminado exitosamente.');
        Session::flash('class', 'warning');

        return redirect()->action('PagoAnticipadoController@index', compact('produccionTransitoId'));
    }
}
