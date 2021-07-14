<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use App\User;
use App\InspeccionCarga;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Resources\IncidenciaResource;
use App\Notifications\GeneralNotification;
use App\Http\Requests\IncidenciaValidacion;
use Illuminate\Support\Facades\Notification;

class IncidenciaInspeccionController extends ApiController
{


    public function index(RecepcionReclamoDevolucion $reclamos_devolucione)
    {
        $incidencia_inspeccion = $reclamos_devolucione->inspeccionCarga;
        return $this->showAllResources(IncidenciaResource::collection($incidencia_inspeccion));
    }


    public function store(IncidenciaValidacion $request, RecepcionReclamoDevolucion $reclamos_devolucione)
    {
        $reclamos_devolucione_id = $reclamos_devolucione->id;
        $request->merge([
            'recepcion_reclamo_devolucion_id' => $reclamos_devolucione_id,
            'user_id' => auth()->user()->id
        ]);
        $test = $request->all();
        $recepcion_mercancia = InspeccionCarga::create($test);
        /* notificacion */
        $login_user = auth()->user()->name;
        $comprador_asignado = User::find($reclamos_devolucione->ProduccionTransito->pivotTable->tarea->user_id);
        $nombre_empresa = $reclamos_devolucione->ProduccionTransito->pivotTable->proveedor->nombre;
        $user_coordinador = User::find($reclamos_devolucione->ProduccionTransito->pivotTable->tarea->sender_id);
        $presidente = User::where('isPresidente', true)->get();
        $user_all = $presidente->push($user_coordinador, $comprador_asignado)->unique('id');
        $body = "El usuario '$login_user' agrego una comentario relacionado con la inspección de mercancia con la empresa '$nombre_empresa'";
        $link = "/claims/?id=$reclamos_devolucione->id&tab=inspeccion_carga";
        $type = "inspeccion_carga";
        /* Notification::send($user_all, new GeneralNotification($body, $link, $tipoNotify)); */
        $title = "$login_user Agrego comentario en inspección de mercancia";
        $this->sendNotifications($user_all, new GeneralNotification($body, $link, $type, $title));

        return $this->showOneResource(new IncidenciaResource($recepcion_mercancia));
    }


    public function show(InspeccionCarga $inspeccion_carga_id)
    {
        return $this->showOneResource(new IncidenciaResource($inspeccion_carga_id));
    }


    public function update(IncidenciaValidacion $request, InspeccionCarga $inspeccion_carga_id)
    {
        $inspeccion_carga_id->update($request->only('titulo', 'descripcion'));
        $inspeccion_carga_id->save();
        return $this->showOneResource(new IncidenciaResource($inspeccion_carga_id));
    }


    public function destroy(InspeccionCarga $inspeccion_carga_id)
    {
        $inspeccion_carga_id->delete();
        return $this->showOneResource(new IncidenciaResource($inspeccion_carga_id));
    }
}
