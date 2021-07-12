<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use App\User;
use App\RecepcionMercancia;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Resources\IncidenciaResource;
use App\Notifications\GeneralNotification;
use App\Http\Requests\IncidenciaValidacion;
use Illuminate\Support\Facades\Notification;

class IncidenciaRecepcion extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(RecepcionReclamoDevolucion $reclamos_devolucione)
    {
        $reclamos_devolucione = $reclamos_devolucione->recepcionMercancia;
        return $this->showAllResources(IncidenciaResource::collection($reclamos_devolucione));
    }

    public function store(IncidenciaValidacion $request, RecepcionReclamoDevolucion $reclamos_devolucione)
    {
        $reclamos_devolucione_id = $reclamos_devolucione->id;
        $request->merge([
            'recepcion_reclamo_devolucion_id' => $reclamos_devolucione_id,
            'user_id' => auth()->user()->id
        ]);
        $test = $request->all();
        /* notificacion */
        $login_user = auth()->user()->name;
        $comprador_asignado = User::find($reclamos_devolucione->ProduccionTransito->pivotTable->tarea->user_id);
        $nombre_empresa = $reclamos_devolucione->ProduccionTransito->pivotTable->proveedor->nombre;
        $user_coordinador = User::where('rol', 'coordinador')->get();
        $user_all = $user_coordinador->push($comprador_asignado)->unique('id');
        $body = "El usuario '$login_user' agrego una incidencia relacionado con la recepcción de mercancia con la empresa '$nombre_empresa'";
        $link = "/claims/?id=$reclamos_devolucione->id&tab=incidencia_recepcion";
        $type = "recepcion_carga";
        /* Notification::send($user_all, new GeneralNotification($body, $link, $tipoNotify)); */
        $title = "$login_user Agrego comentario en recepcion de mercancia";
        $this->sendNotifications($user_all, new GeneralNotification($body, $link, $type, $title));

        /* creacion de datos en el objeto */
        $recepcion_mercancia = RecepcionMercancia::create($test);

        return $this->showOneResource(new IncidenciaResource($recepcion_mercancia));
    }


    public function show(RecepcionMercancia $incidencia_recepcion_id)
    {
        return $this->showOneResource(new IncidenciaResource($incidencia_recepcion_id));
    }


    public function update(IncidenciaValidacion $request, RecepcionMercancia $incidencia_recepcion_id)
    {
        $incidencia_recepcion_id->update($request->only('titulo', 'descripcion'));
        $incidencia_recepcion_id->save();
        return $this->showOneResource(new IncidenciaResource($incidencia_recepcion_id));
    }


    public function destroy(RecepcionMercancia $incidencia_recepcion_id)
    {
        $incidencia_recepcion_id->delete();
        return $this->showOneResource(new IncidenciaResource($incidencia_recepcion_id));
    }
}
