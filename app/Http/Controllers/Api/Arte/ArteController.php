<?php

namespace App\Http\Controllers\Api\Arte;

use auth;
use App\Arte;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ArteResource;
use App\Http\Controllers\ApiController;
use App\Notifications\GeneralNotification;
use Illuminate\Support\Facades\Notification;

class ArteController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $arte = Arte::orderByDesc('id')->get();
        $arteResource = ArteResource::collection($arte);
        return $this->showAllResources($arteResource);
    }

    public function show(Arte $arte)
    {
        return $this->showOneResource(new ArteResource($arte));
    }

    public function update(Request $request, Arte $arte)
    {
        $user = auth()->user();
        if (!($user->rol === 'comprador' || $user->rol === 'coordinador' || $user->rol === 'artes') && ($request->fecha_fin)) 
        {
            return $this->errorResponse('No tiene Permiso para Realizar esta Operacion', 403);
        }
        /* creacion de mensaje */
        $user_all = User::where('rol', 'presidente')->orWhere('rol', 'artes')->get();
        $coordinador   = User::find($arte->pivotTable->tarea->sender_id);
        $comprador_asignado = User::find($arte->pivotTable->tarea->user_id);
        $codigo = $arte->pivotTable->compra_po;
        $user          = $user_all->push($coordinador,$comprador_asignado)->unique('id');
        /* fin de cuerpo comun de mensaje */
        $arte->fill($request->all());
        /* creacion de ficha */
        if($arte->isDirty('creacion_fichas') && $arte->creacion_fichas == 'en_proceso' )
        {
            $body       = "Se actualizo el campo creación de ficha al estado 'En Proceso' perteneciente al codigo: $codigo";
            $link       = "";
            $tipoNotify = "creacion_fichas";
            Notification::send($user, new GeneralNotification($body, $link, $tipoNotify));
        }

        
        if($arte->isDirty('creacion_fichas') && $arte->creacion_fichas == 'finalizado' )
        {
            $body       = "Se actualizo el campo creación de ficha al estado 'Finalizado' perteneciente al codigo: $codigo";
            $link       = "";
            $tipoNotify = "creacion_fichas";
            Notification::send($user, new GeneralNotification($body, $link, $tipoNotify));
        }

        /* fin de creacion de ficha */
        /* validacion de fichas */

        if($arte->isDirty('validacion_fichas') && $arte->validacion_fichas == 'en_proceso' )
        {
            $body       = "Se actualizo el campo validación de ficha al estado 'En Proceso' perteneciente al codigo: $codigo";
            $link       = "";
            $tipoNotify = "validacion_fichas";
            Notification::send($user, new GeneralNotification($body, $link, $tipoNotify));
        }



        if($arte->isDirty('validacion_fichas') && $arte->validacion_fichas == 'finalizado' )
        {
            $body       = "Se actualizo el campo validación de ficha al estado 'Finalizado' perteneciente al codigo: $codigo";
            $link       = "";
            $tipoNotify = "validacion_fichas";
            Notification::send($user, new GeneralNotification($body, $link, $tipoNotify));
        }

        /* fin de validacion de fichas */

        /* creacion de bocetos */


        if($arte->isDirty('creacion_boceto') && $arte->creacion_boceto == 'en_proceso' )
        {
            $body       = "Se actualizo el campo Creación de Boceto al estado 'En Proceso' perteneciente al codigo: $codigo";
            $link       = "";
            $tipoNotify = "creacion_boceto";
            Notification::send($user, new GeneralNotification($body, $link, $tipoNotify));
        }

        if($arte->isDirty('creacion_boceto') && $arte->creacion_boceto == 'finalizado' )
        {
            $body       = "Se actualizo el campo Creación de Boceto al estado 'Finalizado' perteneciente al codigo: $codigo";
            $link       = "";
            $tipoNotify = "creacion_boceto";
            Notification::send($user, new GeneralNotification($body, $link, $tipoNotify));
        }

        /* fin de creacion de boceto */


        /* validacion de boceto */

        if($arte->isDirty('validacion_boceto') && $arte->validacion_boceto == 'en_proceso' )
        {
            $body       = "Se actualizo el campo Validación de Boceto al estado 'En Proceso' perteneciente al codigo: $codigo";
            $link       = "";
            $tipoNotify = "validacion_boceto";
            Notification::send($user, new GeneralNotification($body, $link, $tipoNotify));
        }

        if($arte->isDirty('validacion_boceto') && $arte->validacion_boceto == 'finaliado' )
        {
            $body       = "Se actualizo el campo Validación de Boceto al estado 'Finalizado' perteneciente al codigo: $codigo";
            $link       = "";
            $tipoNotify = "validacion_boceto";
            Notification::send($user, new GeneralNotification($body, $link, $tipoNotify));
        }

        /* fin de validacion de boceto */


        /* conficrmacionde proveedor */

        if($arte->isDirty('confirmacion_proveedor') && $arte->confirmacion_proveedor == 'en_proceso' )
        {
            $body       = "Se actualizo el campo Confirmación de Proveedor al estado 'En Proceso' perteneciente al codigo: $codigo";
            $link       = "";
            $tipoNotify = "confirmacion_proveedor";
            Notification::send($user, new GeneralNotification($body, $link, $tipoNotify));
        }
        if($arte->isDirty('confirmacion_proveedor') && $arte->confirmacion_proveedor == 'finalizado' )
        {
            $body       = "Se actualizo el campo Confirmación de Proveedor al estado 'Finalizado' perteneciente al codigo: $codigo";
            $link       = "";
            $tipoNotify = "confirmacion_proveedor";
            Notification::send($user, new GeneralNotification($body, $link, $tipoNotify));
        }
        /* fin de valicaicon de proveedor */



        $arte->save(); 
        return $this->showOneResource(new ArteResource($arte));
    }




}
