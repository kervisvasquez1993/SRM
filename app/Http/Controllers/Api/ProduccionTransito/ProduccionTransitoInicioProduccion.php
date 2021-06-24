<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use App\User;
use App\InicioProduccion;
use App\ProduccionTransito;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use App\Notifications\GeneralNotification;
use App\Http\Requests\IncidenciaValidacion;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpFoundation\Response;

class ProduccionTransitoInicioProduccion extends ApiController
{
    private $validator_array = [
        'titulo' => 'required',
        'descripcion' => 'required'
    ];

    public function index(Request $request)
    {
        $inicioProduccion = InicioProduccion::where('produccion_transito_id', $request->produccion_transito_id)->get();
        return $this->showAll($inicioProduccion);
    }

    public function store(IncidenciaValidacion $request)
    {
        $request->validated();
        $produccionTransitoId = ProduccionTransito::findOrFail($request->produccion_transito_id);
        $inicioProduccion = new InicioProduccion();
        $inicioProduccion->produccion_transito_id = $request->produccion_transito_id;
        $inicioProduccion->user_id = auth()->user()->id;
        $inicioProduccion->titulo = $request->titulo;
        $inicioProduccion->descripcion = $request->descripcion;
        $inicioProduccion->save();
        /* notificacion agregada */
        $login_user         = auth()->user()->name;
        $user_all           = User::where('rol', 'logistica')->orWhere('rol', 'coordinador')->get();
        $comprador_asignado = User::find($produccionTransitoId->pivotTable->tarea->user_id);
        $user               = $user_all->push($comprador_asignado)->unique('id');
        $text               = "El usuario '$login_user' agrego incidencia realcionada con inicio de produccion en la empresa: ".$produccionTransitoId->pivotTable->proveedor->nombre;
        $link               = "/productions?id=$produccionTransitoId->id&tab=inicio_produccion";
        $type               = "inicio_produccion";
        Notification::send($user, new GeneralNotification($text, $link, $type));
        return $this->showOne($inicioProduccion);
    }


    public function show($inicioProduccion_id)
    {
    }

    public function update(IncidenciaValidacion $request, $inicioProduccion_id)
    {
        $request->validated();

        $inicioProduccion = InicioProduccion::findOrFail($inicioProduccion_id);
        $inicioProduccion->update($request->all());
        $inicioProduccion->save();
        return $this->showOne($inicioProduccion);
    }

    public function destroy($inicioProduccion_id)
    {
        $inicioProduccion = InicioProduccion::findOrFail($inicioProduccion_id);
        $inicioProduccion->delete();
        return $this->showOne($inicioProduccion);
    }
}
