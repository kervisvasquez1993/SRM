<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use App\User;
use App\ReclamosDevolucione;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Notifications\GeneralNotification;
use App\Http\Requests\IncidenciaValidacion;
use Illuminate\Support\Facades\Notification;

class ReclamoDevolucionesController extends ApiController
{
    public function index(RecepcionReclamoDevolucion $reclamos_devolucione)
    {
        $incidencia_recepcion = $reclamos_devolucione->reclamoDevolucion;
        return $this->showAll($incidencia_recepcion);
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
        $body = "El usuario '$login_user' agrego una incidencia relacionado con la reclamos y devolución asociado a la empresa '$nombre_empresa'";
        $link = "/claims/?id=$reclamos_devolucione->id&tab=reclamos_devolucion";
        $tipoNotify = "recepcion_carga";
        Notification::send($user_all, new GeneralNotification($body, $link, $tipoNotify));

        /* creacion de datos en el objeto */


        $recepcion_mercancia = ReclamosDevolucione::create($test);   
        return $this->showOne($recepcion_mercancia);  
        
    }

   
    public function show(ReclamosDevolucione $reclamos_devolucion_id)
    {
       
        return $this->showOne($reclamos_devolucion_id);
    }

   
    public function update(IncidenciaValidacion $request, ReclamosDevolucione $reclamos_devolucion_id)
    {
         $reclamos_devolucion_id->update($request->only('titulo', 'descripcion'));
         $reclamos_devolucion_id->save();
         return $this->showOne($reclamos_devolucion_id);
    }

  
    public function destroy( ReclamosDevolucione $reclamos_devolucion_id)
    {  
        $reclamos_devolucion_id->delete();
        return $this->showOne($reclamos_devolucion_id);

    }
}
