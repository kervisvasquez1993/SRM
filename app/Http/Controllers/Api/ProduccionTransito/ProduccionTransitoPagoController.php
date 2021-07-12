<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use App\Pago;
use App\User;
use Carbon\Carbon;
use App\ProduccionTransito;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PagoResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use App\Notifications\GeneralNotification;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpFoundation\Response;

class ProduccionTransitoPagoController extends ApiController
{
    private $validator_array = [
        'titulo' => 'required',
        'url_archivo_factura' => 'required',
        'monto' => 'required|numeric',
        'fecha' => 'required|date',
    ];

    public function index(Request $request)
    {
        $produccionTransito = ProduccionTransito::findOrFail($request->produccion_transito_id);
        return  $this->showAllResources(PagoResource::collection($produccionTransito->pagos));
    }

    public function store(Request $request)
    {

        

        $validator = Validator::make($request->all(), $this->validator_array);
        if ($validator->fails())
        {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }
        $produccionTransitoId = ProduccionTransito::findOrFail($request->produccion_transito_id);
        if(!$produccionTransitoId->pagos->isEmpty())
        {
            $tipo = "Pago Restante";
            $type = "pago_restante";
        }
        else
        {
            $tipo = "Pago Anticipado";
            $type = "pago_anticipado";
             
        }
        $pago = new Pago();
        $pago->produccion_transito_id = $request->produccion_transito_id;
        $pago->user_id = Auth::user()->id;
        $pago->titulo = $request->titulo;
        $pago->monto = $request->monto;
        //$pago->url_archivo_factura = $request->url_archivo_factura->store('factura-pago');
        $pago->url_archivo_factura = $request->url_archivo_factura;
        $pago->tipo = $tipo;
        $pago->fecha = $request->fecha;
        $pago->save();
        $login_user         = auth()->user()->name;
        $user_all           = User::where('rol', 'logistica')->orWhere('rol', 'coordinador')->get();
        $comprador_asignado = User::find($produccionTransitoId->pivotTable->tarea->user_id);
        $user               = $user_all->push($comprador_asignado)->unique('id');
        $text               = "El usuario '$login_user' agrego $tipo asociado al proveedor ". $produccionTransitoId->pivotTable->proveedor->nombre;
        $link               = "/productions?id=$request->produccion_transito_id&tab=payments";
        /* Notification::send($user, new GeneralNotification($text, $link, $type)); */
        $title = "Se Agrego un Pago";
        $this->sendNotifications($user, new GeneralNotification($text, $link, $type, $title));
        return $this->showOneResource(new PagoResource($pago));
    }

    public function show(Pago $pago)
    {
        return $this->showOneResource(new PagoResource($pago));
    }

    public function update(Request $request, Pago $pago)
    {
        
        $pago->update($request->all());
        $pago->save();
        return $this->showOneResource(new PagoResource($pago));
    }

    public function destroy(Pago $pago)
    {
        // Storage::delete($pago->url_archivo_factura);
        $pago->delete();
        return $this->showOneResource(new PagoResource($pago));
    }
}
