<?php

namespace App\Http\Controllers\Api\Arte;

use App\Arte;
use App\User;
use App\Boceto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Resources\IncidenciaResource;
use App\Notifications\GeneralNotification;
use App\Http\Requests\IncidenciaValidacion;
use Illuminate\Support\Facades\Notification;

class ArteBocetoController extends ApiController
{

    public function index(Arte $arte)
    {
        return $this->showAllResources(IncidenciaResource::collection($arte->boceto));
    }

    public function store(IncidenciaValidacion $request, Arte $arte)
    {
        $request->validated();
        
        $boceto = new Boceto();
        $boceto->arte_id = $arte->id;
        $boceto->user_id = auth()->user()->id;
        $boceto->titulo = $request->titulo;
        $boceto->descripcion = $request->descripcion;
        $boceto->save();

        /* notificacion */
        $login_user         = auth()->user()->name;
        $user_all           = User::where('rol','artes')->orWhere('isPresidente', true)->get();
        $comprador_asignado = User::find($arte->pivotTable->tarea->user_id);
        $coordinador        = User::find($arte->pivotTable->tarea->sender_id);
        $user               = $user_all->push($comprador_asignado, $coordinador)->unique('id');
        $codigo             = $arte->pivotTable->compra_po;
        $text               = "El usuario '$login_user' agregó comentario en la creación de boceto asociado al codigo: $codigo";
        $link               = "/arts?id=$arte->id&tab=boceto";
        $type               = "arte_boceto";
        $title              = "Comentario sobre Creación de Boceto";
        /* Notification::send($user, new GeneralNotification($text, $link, $type)); */
        $this->sendNotifications($user, new GeneralNotification($text, $link, $type, $title));
        return $this->showOneResource(new IncidenciaResource($boceto));
    }


    public function show(Boceto $boceto)
    {
        return $this->showOneResource(new IncidenciaResource($boceto));
    }

    public function update(IncidenciaValidacion $request, Boceto $boceto)
    {
        $request->validated();

        $boceto->update($request->all());
        $boceto->save();
        return $this->showOneResource(new IncidenciaResource($boceto));
    }


    public function destroy(Boceto $boceto)
    {
        $boceto->delete();
        return $this->showOneResource(new IncidenciaResource($boceto));
    }
}
