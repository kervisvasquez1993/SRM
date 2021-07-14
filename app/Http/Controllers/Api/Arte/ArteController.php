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
        /* notificacion */
        $user_all = User::where('isPresidente', true)->orWhere('rol', 'artes')->get();
        $coordinador   = User::find($arte->pivotTable->tarea->sender_id);
        $comprador_asignado = User::find($arte->pivotTable->tarea->user_id);
        $codigo = $arte->pivotTable->compra_po;
        $user          = $user_all->push($coordinador,$comprador_asignado)->unique('id');
        /* fin de cuerpo comun de mensaje */
        $arte->fill($request->all());
        /* creacion de ficha */
        if($arte->isDirty('creacion_fichas') && $arte->creacion_fichas == 'en_proceso' )
        {
            $this->creacionFicha('En Proceso', $codigo, $user);
        }
        
        if($arte->isDirty('creacion_fichas') && $arte->creacion_fichas == 'finalizado' )
        {
            $this->creacionFicha('Finalizado', $codigo, $user);
        }

        /* fin de creacion de ficha */
        /* validacion de fichas */

        if($arte->isDirty('validacion_fichas') && $arte->validacion_fichas == 'en_proceso' )
        {
            
             $this->notificacionReusable(
                $user,
                'Validación de Fichas',
                'En Proceso',
                $codigo,
                "link",
                "Actualización Validación de Ficha",
                "validacion_fichas",
            ); 
            
        }



        if($arte->isDirty('validacion_fichas') && $arte->validacion_fichas == 'finalizado' )
        {
            $this->notificacionReusable(
                $user,
                'Validación de Fichas',
                'Finalizado',
                $codigo,
                "link",
                "Actualización Validación de Ficha",
                "validacion_fichas",
            ); 
        }

        if($arte->isDirty('creacion_boceto') && $arte->creacion_boceto == 'en_proceso' )
        {
            
            $this->notificacionReusable(
                $user,
                'Creación de Bocetos',
                'En Proceso',
                $codigo,
                "link",
                "Actualización Creación de Boceto",
                "creacion_boceto",
            ); 
        }

        if($arte->isDirty('creacion_boceto') && $arte->creacion_boceto == 'finalizado' )
        {
           
            $this->notificacionReusable(
                $user,
                'Creación de Bocetos',
                'Finalizado',
                $codigo,
                "link",
                "Actualización Creación de Boceto",
                "creacion_boceto",
            ); 
        }

        /* fin de creacion de boceto */


        /* validacion de boceto */

        if($arte->isDirty('validacion_boceto') && $arte->validacion_boceto == 'en_proceso' )
        {
            $this->notificacionReusable(
                $user,
                'Validación de Bocetos',
                'En Proceso',
                $codigo,
                "link",
                "Actualización Validación de Boceto",
                "validacion_boceto",
            ); 
        }

        if($arte->isDirty('validacion_boceto') && $arte->validacion_boceto == 'finalizado' )
        {
            
            $this->notificacionReusable(
                $user,
                'Validación de Boceto',
                'Finalizado',
                $codigo,
                "link",
                "Actualización Validación de Boceto",
                "validacion_boceto",
            ); 
        }

        /* fin de validacion de boceto */


        /* conficrmacionde proveedor */

        if($arte->isDirty('confirmacion_proveedor') && $arte->confirmacion_proveedor == 'en_proceso' )
        {
            
            $this->notificacionReusable(
                $user,
                'Confirmación de Proveedor',
                'En Proceso',
                $codigo,
                "link",
                "Actualización en Confirmacion de Proveedor",
                "confirmacion_de_proveedor",
            ); 
        }
        if($arte->isDirty('confirmacion_proveedor') && $arte->confirmacion_proveedor == 'finalizado' )
        {
              $this->notificacionReusable(
                $user,
                'Confirmación de Proveedor',
                'Finalizado',
                $codigo,
                "link",
                "Actualización en Confirmacion de Proveedor",
                "confirmacion_de_proveedor",
            ); 
        }
        /* fin de valicaicon de proveedor */



        $arte->save(); 
        return $this->showOneResource(new ArteResource($arte));
    }


    public function creacionFicha($status, $codigo, $user)
    {
            $body       = "Se actualizo el campo creación de ficha al estado '$status' perteneciente al codigo: $codigo";
            $link       = "";
            $type       = "creacion_fichas";
            $title      = "Actualización de fichas";
            /* Notification::send($user, new GeneralNotification($body, $link, $tipoNotify)); */
            $this->sendNotifications($user, new GeneralNotification($body, $link, $type, $title));
    }

    public function notificacionReusable($user,$campo_actualizado, $status, $codigo, $link, $title, $type)
    {
            $body       = "Se actualizo el campo $campo_actualizado al estado '$status' perteneciente al codigo: $codigo";
            $link       = "";
            $type       = "validacion_fichas";
            $title      = "Actualización Validación de Ficha"; 
            /* Notification::send($user, new GeneralNotification($body, $link, $tipoNotify)); */
            $this->sendNotifications($user, new GeneralNotification($body, $link, $type, $title));
    }



}
