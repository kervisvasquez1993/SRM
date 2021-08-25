<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use App\Archivado;
use App\Http\Controllers\ApiController;
use App\Http\Resources\ReclamoDevolucionResource;
use App\Notifications\GeneralNotification;
use App\RecepcionReclamoDevolucion;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReclamoDevolucionController extends ApiController
{

    public function index()
    {

        if (Auth::user()->rol == "coordinador" || Auth::user()->rol == "almacen") {
            $rrd = RecepcionReclamoDevolucion::all();
        } else {
            $rrd = Auth::user()
                ->tareas()
                ->has('pivotTareaProveedor.produccionTransito.recepcionReclamoDevolucion')
                ->with('pivotTareaProveedor.produccionTransito.recepcionReclamoDevolucion')
                ->get()
                ->pluck('pivotTareaProveedor')
                ->collapse()
                ->whereNotNull('produccionTransito')
                ->pluck('produccionTransito')
                ->pluck('recepcionReclamoDevolucion');
        }

        return $this->showAllResources(ReclamoDevolucionResource::collection($rrd));
    }

    public function show(RecepcionReclamoDevolucion $reclamos_devolucion)
    {
        return $this->showOneResource(new ReclamoDevolucionResource($reclamos_devolucion));
    }

    public function update(Request $request, RecepcionReclamoDevolucion $reclamos_devolucione)
    {
        $reclamos_devolucione->fill($request->all());

        $comprador_asignado = User::find($reclamos_devolucione->ProduccionTransito->pivotTable->tarea->user_id);
        $coordinador_asignado = User::find($reclamos_devolucione->ProduccionTransito->pivotTable->tarea->sender_id);
        $nombre_empresa = $reclamos_devolucione->ProduccionTransito->pivotTable->proveedor->nombre;

        // Usuarios a los que se enviara la notificación
        $usuarios = User::where('isPresidente', true)->orWhere('rol', "almacen")->get();
        $usuarios = $usuarios->push($comprador_asignado, $coordinador_asignado)->unique('id');
        $codigo_po = $reclamos_devolucione->ProduccionTransito->pivotTable->compra_po;

        if ($reclamos_devolucione->isDirty('recepcion_mercancia') && $reclamos_devolucione->recepcion_mercancia == 1) {
            $body = "Se completó la etapa de recepción de mercancia de la empresa '$nombre_empresa' con el código de orden de compra $codigo_po";
            $link = "/claims/$reclamos_devolucione->id/reception";
            $type = "recepcion_mercancia_finalizada";
            $title = "Recepción de Mercancía Finalizada";
            $this->sendNotifications($usuarios, new GeneralNotification($body, $link, $type, $title));
        }

        if ($reclamos_devolucione->isDirty('inspeccion_carga') && $reclamos_devolucione->recepcion_mercancia == 1) {
            $body = "Se completó la etapa de inspección de carga de la empresa '$nombre_empresa' con el código de orden de compra $codigo_po";
            $link = "/claims/$reclamos_devolucione->id/inspection";
            $type = "inspeccion_carga_finalizada";
            $title = "Inspeccion de Carga Finalizada";
            $this->sendNotifications($usuarios, new GeneralNotification($body, $link, $type, $title));
        }

        if ($reclamos_devolucione->isDirty('reclamos_devoluciones') && $reclamos_devolucione->reclamos_devoluciones == 1) {
            $body = "Se completó la etapa de reclamos y devoluciones de la empresa '$nombre_empresa' con el código de orden de compra $codigo_po";
            $link = "/claims/$reclamos_devolucione->id/claim";
            $type = "reclamos_devoluciones_finalizada";
            $title = "Reclamos y Devoluciones Completos";
            $this->sendNotifications($usuarios, new GeneralNotification($body, $link, $type, $title));
        }

        $reclamos_devolucione->save();
        if ($reclamos_devolucione->reclamos_devoluciones == 1) {
            $pivot_id = $reclamos_devolucione->ProduccionTransito->pivotTable->id;
            $existente = Archivado::where('pivot_tarea_proveeder_id', $pivot_id)->first();
            if (!$existente) {
                $archivado = new Archivado();
                $archivado->pivot_tarea_proveeder_id = $pivot_id;
                $archivado->save();
            }
        }

        return $this->showOneResource(new ReclamoDevolucionResource($reclamos_devolucione));
    }
}
