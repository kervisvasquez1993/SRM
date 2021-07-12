<?php

namespace App\Http\Controllers\Api\Arte;

use App\Arte;
use App\User;
use App\ValidacionFicha;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Resources\IncidenciaResource;
use App\Notifications\GeneralNotification;
use App\Http\Requests\IncidenciaValidacion;
use Illuminate\Support\Facades\Notification;

class ArteValidacionFichaController extends ApiController
{

    public function index(Arte $arte)
    {
        return $this->showAllResources(IncidenciaResource::collection($arte->validacionFicha));
    }

    public function store(IncidenciaValidacion $request, Arte $arte)
    {
        $request->validated();
        
        $arte_ficha_validacion = new ValidacionFicha();
        $arte_ficha_validacion->arte_id = $arte->id;
        $arte_ficha_validacion->user_id = auth()->user()->id;
        $arte_ficha_validacion->titulo = $request->titulo;
        $arte_ficha_validacion->descripcion = $request->descripcion;
        $arte_ficha_validacion->save();

        $login_user = auth()->user()->name;
        $user_all   = User::where('rol', 'artes')->orWhere('rol', 'coordinador')->get();
        $comprador_asignado = User::find($arte->pivotTable->tarea->user_id);
        $coordinador        = User::find($arte->pivotTable->tarea->sender_id);
        $codigo             = $arte->pivotTable->compra_po;
        $user = $user_all->push($comprador_asignado, $coordinador)->unique('id');
        $text               = "El usuario '$login_user' agrego comentario en la sección Validación de Fichas asociado al codigo: $codigo";
        $link    = "/arts?id=$arte->id&tab=validacion_ficha";
        $type    = "validacion_ficha";
        $title   = "Comentario en Validación de Fichas";
        /* Notification::send($user, new GeneralNotification($text, $link, $type)); */
        $this->sendNotifications($user, new GeneralNotification($text, $link, $type, $title));

        return $this->showOneResource(new IncidenciaResource($arte_ficha_validacion));
    }


    public function show(ValidacionFicha $validacion_ficha)
    {
        return $this->showOneResource(new IncidenciaResource($validacion_ficha));
    }


    public function update(IncidenciaValidacion $request, ValidacionFicha $validacion_ficha)
    {
        $request->validated();

        $validacion_ficha->update($request->all());
        return $this->showOneResource(new IncidenciaResource($validacion_ficha));
    }


    public function destroy(ValidacionFicha $validacion_ficha)
    {
        $validacion_ficha->delete();
        return $this->showOneResource(new IncidenciaResource($validacion_ficha));
    }
}
