<?php

namespace App\Http\Controllers\Api\Arte;

use App\Arte;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ArteResource;
use Illuminate\Support\Facades\Auth;
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
    
    private $etiquetas = [
        "sin_inicializar" => "Sin Inicializar",
        "en_proceso" => "En Proceso",
        "finalizado" => "Finalizado"
    ];

    private $categorias = [
        "creacion_fichas" => "Creación de Fichas",
        "validacion_fichas" => "Validación de Fichas",
        "creacion_boceto" => "Creación de Bocetos",
        "validacion_boceto" => "Validación de Bocetos",
        "confirmacion_proveedor" => "Confirmación de Proveedor"
    ];

    public function index()
    {
        if (auth()->user()->rol == "coordinador" || auth()->user()->rol == "arte") {
            $arteResource = Arte::all();
        } else {
            $arteResource = Auth::user()
                ->tareas()
                ->has('pivotTareaProveedor.arte')
                ->with('pivotTareaProveedor.arte')
                ->get()
                ->pluck('pivotTareaProveedor')
                ->collapse()
                ->whereNotNull('arte')
                ->pluck('arte');
        }

        
        return $this->showAllResources(ArteResource::collection($arteResource));
    }

    public function show(Arte $arte)
    {
        return $this->showOneResource(new ArteResource($arte));
    }
    public function update(Request $request, Arte $arte)
    {
        $user = auth()->user();
        if (!($user->rol === 'comprador' || $user->rol === 'coordinador' || $user->rol === 'artes') && ($request->fecha_fin)) {
            return $this->errorResponse('No tiene Permiso para Realizar esta Operacion', 403);
        }
        /* creacion de mensaje */
        $user_all           = User::where('isPresidente', true)->orWhere('rol', 'artes')->get();
        $coordinador        = User::find($arte->pivotTable->tarea->sender_id);
        $comprador_asignado = User::find($arte->pivotTable->tarea->user_id);
        $codigo             = $arte->pivotTable->compra_po;
        $user               = $user_all->push($coordinador, $comprador_asignado)->unique('id');
        $arte->fill($request->all());
        foreach ($this->categorias as $id => $etiqueta):
            if ($arte->isDirty($id)):
                $etiquetaValor = $this->etiquetas[$arte[$id]];
                $body        = "Se actualizo el campo '$etiqueta' al estado '$etiquetaValor' perteneciente al codigo: $codigo";
                $link        = "/arts?id=$arte->id";
                $title       = $etiqueta;
                $type        = "cambio_".$id;
                $this->sendNotifications($user, new GeneralNotification($body, $link, $type, $title));
            endif;
        endforeach;
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
