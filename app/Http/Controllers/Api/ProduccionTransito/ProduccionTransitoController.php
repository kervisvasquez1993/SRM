<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use App\User;
use App\ProduccionTransito;
use App\ReclamosDevolucione;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Notifications\GeneralNotification;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\ProduccionTransitoResource;

class ProduccionTransitoController extends ApiController
{
   
    public function index()
    {
        $producionTransito = ProduccionTransito::all();
        $produccionTransitoResource = ProduccionTransitoResource::collection($producionTransito);
        return $this->showAllResources($produccionTransitoResource);
    }

    public function show(ProduccionTransito $produccionTransito)
    {
        return $this->showOneResource(new ProduccionTransitoResource($produccionTransito));
    }


    public function update(Request $request, ProduccionTransito $produccionTransito)
    {

        
        if ($request->inicio_produccion == 0 && $produccionTransito->fin_produccion == 1) {
            return $this->errorResponse('ya finalizo la produccion no puede desmarcar inicio de produccion', Response::HTTP_BAD_REQUEST);
        }
        if ($request->pago_balance == 1  && $produccionTransito->pagos_anticipados == 0) {
            return $this->errorResponse('Debe agregar antes un pago anticipado  pago de balance', Response::HTTP_BAD_REQUEST);
        }

        if (
            $request->salida_puero_origen == 1
            && $produccionTransito->pagos_anticipados == 0
            && $produccionTransito->inicio_produccion == 0
            && $produccionTransito->fin_produccion == 0
            && $produccionTransito->pago_balance == 0
            && $produccionTransito->transito_nacionalizacion == 0
        ) 
        {
            return $this->errorResponse('Debe tener todos los servicios finalizado', Response::HTTP_BAD_REQUEST);
        }

        $produccionTransito->update($request->all());
        $produccionTransito->save();
        $userAll = User::where('rol', 'coordinador')->get();
        $nombreEmpresa = $produccionTransito->pivotTable->proveedor->nombre;
        $nombreTarea   = $produccionTransito->pivotTable->tarea->nombre;

        if ($produccionTransito->salida_puero_origen == 1) {
            $body = "La empresa $nombreEmpresa asociada a la tarea $nombreTarea salio del puerto de origen.";
            $link = "";
            $tipoNotify = "salida_puerto_origen";
            Notification::send($userAll, new GeneralNotification($body, $link, $tipoNotify));
            /* crear Nuevo Reclamos y devoluciones */
            $this->reclamosDevolucion($produccionTransito->id);
                     

        }

        return $this->showOneResource(new ProduccionTransitoResource($produccionTransito));
    }

    public function reclamosDevolucion($id)
    {
        $produccionTransito_id = ProduccionTransito::findOrFail($id)->id;
        
        $reclamnos_devolucion = RecepcionReclamoDevolucion::where('produccion_transito_id',$produccionTransito_id)->first();
        if(!$reclamnos_devolucion)
        {
            $reclamnosDevolucion = new RecepcionReclamoDevolucion();
            $reclamnosDevolucion->produccion_transito_id = $id;
            $reclamnosDevolucion->save();    
            return;
        }
        return $this->errorResponse('Ya Existe', Response::HTTP_BAD_REQUEST);
    
    }
}
