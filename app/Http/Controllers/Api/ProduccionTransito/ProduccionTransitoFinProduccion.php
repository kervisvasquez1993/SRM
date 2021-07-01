<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use auth;
use App\User;
use App\FinProduccion;
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

class ProduccionTransitoFinProduccion extends ApiController
{
    public function index(ProduccionTransito $produccion_transito)
    {
        return $this->showAllResources(IncidenciaResource::collection($produccion_transito->finProduccion));
    }

    public function store(IncidenciaValidacion $request, ProduccionTransito $produccion_transito)
    {
        $request->validated();
        $fin_produccion = new FinProduccion();
        $fin_produccion->produccion_transito_id = $produccion_transito->id;
        $fin_produccion->user_id = auth()->user()->id;
        $fin_produccion->titulo = $request->titulo;
        $fin_produccion->descripcion = $request->descripcion;
        $fin_produccion->save();
        /* notificacion agregada */
        $login_user         = auth()->user()->name;
        $user_all           = User::where('rol', 'logistica')->orWhere('rol', 'coordinador')->get();
        $comprador_asignado = User::find($produccion_transito->pivotTable->tarea->user_id);
        $user               = $user_all->push($comprador_asignado)->unique('id');
        $text               = "El usuario '$login_user' agrego incidencia relacionada con el fin de produccion en la empresa: " . $produccion_transito->pivotTable->proveedor->nombre;
        $link               = "/productions?id=$produccion_transito->id&tab=fin_produccion";
        $type               = "incidencia_fin_produccion";
        Notification::send($user, new GeneralNotification($text, $link, $type));

        return $this->showOneResource(new IncidenciaResource($fin_produccion));
    }

    public function show(FinProduccion $fin_produccion)
    {
        return $this->showOneResource(new IncidenciaResource($fin_produccion));
    }

    public function update(IncidenciaValidacion $request, FinProduccion $fin_produccion)
    {
        $request->validated();

        $fin_produccion->update($request->all());
        $fin_produccion->save();
        return $this->showOneResource(new IncidenciaResource($fin_produccion));
    }

    public function destroy(FinProduccion $fin_produccion)
    {
        $fin_produccion->delete();
        return $this->showOneResource(new IncidenciaResource($fin_produccion));
    }
}
