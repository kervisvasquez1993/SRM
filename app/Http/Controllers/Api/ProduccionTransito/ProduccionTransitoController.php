<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use App\Http\Controllers\ApiController;
use App\Http\Resources\ProduccionTransitoResource;
use App\Notifications\GeneralNotification;
use App\ProduccionTransito;
use App\RecepcionReclamoDevolucion;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ProduccionTransitoController extends ApiController
{

    public function index()
    {
        if (auth()->user()->rol == "coordinador" || auth()->user()->rol == "logistica" || auth()->user()->rol == "presidente") {
            $produccion_transito_user = ProduccionTransito::all();
        } else {
            $produccion_transito_user = Auth::user()
                ->tareas()
                ->has('pivotTareaProveedor.produccionTransito')
                ->with('pivotTareaProveedor.produccionTransito')
                ->get()
                ->pluck('pivotTareaProveedor')
                ->collapse()
                ->whereNotNull('produccionTransito')
                ->pluck('produccionTransito');
        }
        $produccionTransitoResource = ProduccionTransitoResource::collection($produccion_transito_user);
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
        if ($request->pago_balance == 1 && $produccionTransito->pagos_anticipados == 0) {
            return $this->errorResponse('Debe agregar antes un pago anticipado  pago de balance', Response::HTTP_BAD_REQUEST);
        }

        $produccionTransito->fill($request->all());

        $user_all = User::where('isPresidente', true)->orWhere('rol', 'logistica')->get();
        $coordinador = User::find($produccionTransito->pivotTable->tarea->sender_id);
        $comprador_asignado = User::find($produccionTransito->pivotTable->tarea->user_id);
        $nombreEmpresa = $produccionTransito->pivotTable->proveedor->nombre;
        $nombreTarea = $produccionTransito->pivotTable->tarea->nombre;
        $user = $user_all->push($coordinador, $comprador_asignado)->unique('id');
        $link = "/productions?id=$produccionTransito->id";

        if ($produccionTransito->isDirty('inicio_produccion') && $produccionTransito->inicio_produccion == 1) {

            $body = "La empresa $nombreEmpresa asociada a la tarea $nombreTarea inicio producción";
            /*logica para fecha de inicio de produccion*/
            if (!$produccionTransito->fecha_fin_produccion) {
                $produccionTransito->fecha_fin_produccion = Carbon::now()->addDays($produccionTransito->pivotTable->delivery_time)->toDateString();
            }

            /* fin de logica */
            $tipoNotify = "inicio_produccion";
            /* Notification::send($user, new GeneralNotification($body, $link, $tipoNotify)); */
            $title = "Inicio de Produccion";
            $this->sendNotifications($user, new GeneralNotification($body, $link, $tipoNotify, $title));
        }

        if ($produccionTransito->isDirty('fin_produccion') && $produccionTransito->fin_produccion == 1) {

            $body = "La empresa $nombreEmpresa asociada a la tarea $nombreTarea finalizó producción";
            $tipoNotify = "fin_produccion";
            /* Notification::send($user, new GeneralNotification($body, $link, $tipoNotify)); */
            $title = "Fin de Produccion";
            $this->sendNotifications($user, new GeneralNotification($body, $link, $tipoNotify, $title));
        }
        if ( $produccionTransito->isDirty('salida_puero_origen') && $request->salida_puero_origen == 1) {
            $almacen = User::where('rol', 'almacen')->get();
            $nuevo_user = $almacen->merge($user);
            $body = "La empresa $nombreEmpresa salio del puerto de origen";
            $tipoNotify = "salida_puerto_origen";
            /* Notification::send($user, new GeneralNotification($body, $link, $tipoNotify)); */
            $title = "Salida de Puero de Origen";
            $this->sendNotifications($nuevo_user, new GeneralNotification($body, $link, $tipoNotify, $title));
            /* crear Nuevo Reclamos y devoluciones */
           
        }

        if ($produccionTransito->isDirty('transito') && $produccionTransito->transito == 1) {

            $body = "La empresa $nombreEmpresa asociada a la tarea $nombreTarea finalizó el proceso de transito";
            $tipoNotify = "transito";
            $title = "Transito";
            $this->sendNotifications($user, new GeneralNotification($body, $link, $tipoNotify, $title));
        }

        if ($produccionTransito->isDirty('nacionalizacion') && $produccionTransito->nacionalizacion == 1) {
            $codigo_po = $produccionTransito->pivotTable->compra_po;
            $body = "La empresa $nombreEmpresa con el código de orden de compra $codigo_po finalizó el proceso de nacionalizacion y entró en el proceso de recepción";
            $tipoNotify = "nacionalizacion";
            $link = "/claims/?id=$produccionTransito->id";
            $title = "Recepción Iniciada";
            $this->sendNotifications($user, new GeneralNotification($body, $link, $tipoNotify, $title));
            $this->reclamosDevolucion($produccionTransito->id);
        }
        
        $produccionTransito->save();

        return $this->showOneResource(new ProduccionTransitoResource($produccionTransito));
    }

    public function reclamosDevolucion($id)
    {
        $produccionTransito_id = ProduccionTransito::findOrFail($id)->id;

        $reclamnos_devolucion = RecepcionReclamoDevolucion::where('produccion_transito_id', $produccionTransito_id)->first();
        if (!$reclamnos_devolucion) {
            $reclamnosDevolucion = new RecepcionReclamoDevolucion();
            $reclamnosDevolucion->produccion_transito_id = $id;
            $reclamnosDevolucion->save();
            return;
        }
        return $this->errorResponse('Ya Existe', Response::HTTP_BAD_REQUEST);
    }
}
