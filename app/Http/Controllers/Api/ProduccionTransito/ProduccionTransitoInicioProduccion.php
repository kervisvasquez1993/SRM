<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use App\User;
use App\InicioProduccion;
use App\ProduccionTransito;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\IncidenciaResource;
use App\Notifications\GeneralNotification;
use App\Http\Requests\IncidenciaValidacion;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpFoundation\Response;

class ProduccionTransitoInicioProduccion extends ApiController
{
    public function index(ProduccionTransito $produccion_transito)
    {
        return $this->showAllResources(IncidenciaResource::collection($produccion_transito->inicioProduccion));
    }

    public function store(IncidenciaValidacion $request, ProduccionTransito $produccion_transito)
    {
        $request->validated();

        $inicioProduccion = new InicioProduccion();
        $inicioProduccion->produccion_transito_id = $produccion_transito->id;
        $inicioProduccion->user_id = auth()->user()->id;
        $inicioProduccion->titulo = $request->titulo;
        $inicioProduccion->descripcion = $request->descripcion;
        $inicioProduccion->save();

        /* notificacion agregada */
        $login_user         = auth()->user()->name;
        $user_all           = User::where('rol', 'logistica')->orWhere('rol', 'coordinador')->get();
        $comprador_asignado = User::find($produccion_transito->pivotTable->tarea->user_id);
        $user               = $user_all->push($comprador_asignado)->unique('id');
        $text               = "El usuario '$login_user' agrego incidencia realcionada con inicio de produccion en la empresa: ".$produccion_transito->pivotTable->proveedor->nombre;
        $link               = "/productions?id=$produccion_transito->id&tab=inicio_produccion";
        $type               = "incidencia_inicio_produccion";
        Notification::send($user, new GeneralNotification($text, $link, $type));

        return $this->showOneResource(new IncidenciaResource($inicioProduccion));
    }


    public function show($inicioProduccion_id)
    {

    }

    public function update(IncidenciaValidacion $request, InicioProduccion $inicio_produccion)
    {
        $request->validated();

        $inicio_produccion->update($request->all());
        return $this->showOneResource(new IncidenciaResource($inicio_produccion));
    }

    public function destroy(InicioProduccion $inicio_produccion)
    {
        $inicio_produccion->delete();
        return $this->showOneResource(new IncidenciaResource($inicio_produccion));
    }
}
