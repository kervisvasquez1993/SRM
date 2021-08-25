<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use App\User;
use App\Archivado;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ApiController;
use App\Notifications\GeneralNotification;
use App\Http\Resources\ReclamoDevolucionResource;

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
        if($reclamos_devolucione->isDirty('inspeccion_carga') && $reclamos_devolucione->recepcion_mercancia == 1 ) 
        {
            
            $login_user = auth()->user()->name;
            $comprador_asignado = User::find($reclamos_devolucione->ProduccionTransito->pivotTable->tarea->user_id);
            $coordinador_asignado = User::find($reclamos_devolucione->ProduccionTransito->pivotTable->tarea->sender_id);
            $nombre_empresa = $reclamos_devolucione->ProduccionTransito->pivotTable->proveedor->nombre;
            $presidente = User::where('isPresidente', true)->get();
            $user_all = $presidente->push($comprador_asignado, $coordinador_asignado)->unique('id');
            $body = "El usuario '$login_user' agrego imagenes correspondiente a la inspeccion de mercancia en la empresa: '$nombre_empresa'";
            $link = "/claims/$reclamos_devolucione->id/inspection";
            $type = "inspeccion_carga";
            /* Notification::send($user_all, new GeneralNotification($body, $link, $tipoNotify)); */
            $title = "Inspeccion Carga";
            $this->sendNotifications($user_all, new GeneralNotification($body, $link, $type, $title));
        }

        if($reclamos_devolucione->isDirty('reclamos_devoluciones') && $reclamos_devolucione->reclamos_devoluciones == 1 ) 
        {
            
            $login_user = auth()->user()->name;
            $comprador_asignado = User::find($reclamos_devolucione->ProduccionTransito->pivotTable->tarea->user_id);
            $coordinador_asignado = User::find($reclamos_devolucione->ProduccionTransito->pivotTable->tarea->sender_id);
            $nombre_empresa = $reclamos_devolucione->ProduccionTransito->pivotTable->proveedor->nombre;
            $presidente = User::where('isPresidente', true)->get();
            $user_all = $presidente->push($comprador_asignado, $coordinador_asignado)->unique('id');
            $body = "El usuario '$login_user' agrego reclamos y devoluciones perteneciente a la emmpresa: '$nombre_empresa'";
            $link = "/claims/$reclamos_devolucione->id/claim";
            $type = "reclamos_devoluciones";
            /* Notification::send($user_all, new GeneralNotification($body, $link, $tipoNotify)); */
            $title = "Reclamos Devoluciones";
            $this->sendNotifications($user_all, new GeneralNotification($body, $link, $type, $title));
        }
        $reclamos_devolucione->save();
        if ($reclamos_devolucione->reclamos_devoluciones == 1) 
        {
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
