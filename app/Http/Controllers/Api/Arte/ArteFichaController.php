<?php

namespace App\Http\Controllers\Api\Arte;

use App\Arte;
use App\User;
use App\Ficha;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Notifications\GeneralNotification;
use App\Http\Requests\IncidenciaValidacion;
use App\Http\Resources\IncidenciaResource;
use Illuminate\Support\Facades\Notification;

class ArteFichaController extends ApiController
{
    public function index(Arte $arte)
    {
        return $this->showAllResources(IncidenciaResource::collection($arte->ficha));
    }

    public function store(IncidenciaValidacion $request, Arte $arte)
    {
        $request->validated();

        $arte_ficha = new Ficha();
        $arte_ficha->arte_id = $arte->id;
        $arte_ficha->user_id = auth()->user()->id;
        $arte_ficha->titulo = $request->titulo;
        $arte_ficha->descripcion = $request->descripcion;
        $arte_ficha->save();



        $login_user         = auth()->user()->name;
        $user_all           = User::where('rol', 'artes')->orWhere('isPresidente', true)->get();
        $comprador_asignado = User::find($arte->pivotTable->tarea->user_id);
        $coordinador        = User::find($arte->pivotTable->tarea->sender_id);
        $user               = $user_all->push($comprador_asignado,$coordinador)->unique('id');
        $codigo             = $arte->pivotTable->compra_po;
        $text               = "El usuario '$login_user' agrego comentario en la sección Creación de Fichas asociado al codigo: $codigo";
        $link               = "/arts?id=$arte->id&tab=ficha";
        $type               = "arte_ficha";
        $title              = "Comentario en Creación de Fichas";
        /* Notification::send($user, new GeneralNotification($text, $link, $type)); */
        $this->sendNotifications($user, new GeneralNotification($text, $link, $type, $title));
        return $this->showOneResource(new IncidenciaResource($arte_ficha));
    }


    public function show(Ficha $ficha)
    {
        return $this->showOneResource(new IncidenciaResource($ficha));
    }

    public function update(IncidenciaValidacion $request, Ficha $ficha)
    {
        $ficha->update($request->all());
        return $this->showOneResource(new IncidenciaResource($ficha));
    }


    public function destroy(Ficha $ficha)
    {
        $ficha->delete();
        return $this->showOneResource(new IncidenciaResource($ficha));
    }
}
