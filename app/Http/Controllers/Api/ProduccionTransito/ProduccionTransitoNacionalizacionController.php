<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use App\User;
use App\ProduccionTransito;
use Illuminate\Http\Request;
use App\TransitoNacionalizacion;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use App\Notifications\GeneralNotification;
use App\Http\Requests\IncidenciaValidacion;
use App\Http\Resources\IncidenciaResource;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpFoundation\Response;

class ProduccionTransitoNacionalizacionController extends ApiController
{
    public function index(ProduccionTransito $produccion_transito)
    {
        return  $this->showAllResources(IncidenciaResource::collection($produccion_transito->transitosNacionalizacion));
    }

    public function store(IncidenciaValidacion $request, ProduccionTransito $produccion_transito)
    {
        $request->validated();

        $incidencias_transito = new TransitoNacionalizacion();
        $incidencias_transito->produccion_transito_id = $produccion_transito->id;
        $incidencias_transito->user_id = auth()->user()->id;
        $incidencias_transito->titulo = $request->titulo;
        $incidencias_transito->descripcion = $request->descripcion;
        $incidencias_transito->save();

        /* notificacion agregada */
        $login_user         = auth()->user()->name;
        $user_all           = User::where('rol', 'logistica')->orWhere('isPresidente', true)->get();
        $cordinador         = User::find($produccion_transito->pivotTable->tarea->user_id);
        $comprador_asignado = User::find($produccion_transito->pivotTable->tarea->user_id);
        $user               = $user_all->push($comprador_asignado, $cordinador)->unique('id');
        $text               = "El usuario '$login_user' agrego cometario relacionada con transito nacionalización el  en la empresa: ".$produccion_transito->pivotTable->proveedor->nombre;
        $link               = "/productions?id=$produccion_transito->id&tab=incidencias_transito";
        $type               = "incidencia_transito_normalizacion";
        /* Notification::send($user, new GeneralNotification($text, $link, $type)); */
        $title = "Inicio de Produccion";
        $this->sendNotifications($user, new GeneralNotification($text, $link, $type, $title));
        return $this->showOneResource(new IncidenciaResource($incidencias_transito));
    }


    public function show(TransitoNacionalizacion $incidencia_transito)
    {
        return $this->showOneResource(new IncidenciaResource($incidencia_transito));
    }


    public function update(IncidenciaValidacion $request, TransitoNacionalizacion $incidencia_transito)
    {
        $request->validated();
        $incidencia_transito->update($request->all());
        return $this->showOneResource(new IncidenciaResource($incidencia_transito));
    }


    public function destroy(TransitoNacionalizacion $incidencia_transito)
    {
        $incidencia_transito->delete();
        return $this->showOneResource(new IncidenciaResource($incidencia_transito));
    }
}
