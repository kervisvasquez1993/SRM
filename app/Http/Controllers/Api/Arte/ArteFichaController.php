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

        $login_user = auth()->user()->name;
        $user_all   = User::where('rol', 'artes')->orWhere('rol', 'coordinador')->get();
        $comprador_asignado = User::find($arte->pivotTable->tarea->user_id);
        $user = $user_all->push($comprador_asignado)->unique('id');
        $text    = "El usuario '$login_user' agrego una incidencia asociada a creacion de fircha";
        $link    = "/arts?id=$arte->id&tab=ficha";
        $type    = "arte_ficha";
        Notification::send($user, new GeneralNotification($text, $link, $type));
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
