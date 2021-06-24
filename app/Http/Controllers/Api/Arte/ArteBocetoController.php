<?php

namespace App\Http\Controllers\Api\Arte;

use App\Arte;
use App\User;
use App\Boceto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Notifications\GeneralNotification;
use App\Http\Requests\IncidenciaValidacion;
use Illuminate\Support\Facades\Notification;

class ArteBocetoController extends ApiController
{
    
    public function index($arte_id)
    {
        $arte = Arte::findOrFail($arte_id);
        return $this->showAll($arte->boceto);
    }

    
    public function store(IncidenciaValidacion $request, $arte_id)
    {
        $validated = $request->validated();
        $arte = Arte::findOrFail($arte_id);
        $boceto = new Boceto();
        $boceto->arte_id = $arte->id;
        $boceto->user_id = auth()->user()->id;
        $boceto->titulo = $request->titulo;
        $boceto->descripcion = $request->descripcion;
        $boceto->save();
        /* notificacion */
        $login_user         = auth()->user()->name;
        $user_all           = User::where('rol', 'artes')->orWhere('rol', 'coordinador')->get();
        $comprador_asignado = User::find($arte->pivotTable->tarea->user_id);
        $user               = $user_all->push($comprador_asignado)->unique('id');
        $text               = "El usuario '$login_user' agrego una incidencia asociada a creacion de boceto";
        $link               = "/arts?id=$arte->id&tab=boceto";
        $type               = "arte_boceto";
        Notification::send($user, new GeneralNotification($text, $link, $type));
        return $this->showOne($boceto);
    
    }

  
    public function show(Boceto $boceto_id)
    {
        return $this->showOne($boceto_id);
    }

   
    public function update(IncidenciaValidacion $request, Boceto $boceto_id)
    {
        $validated = $request->validated();
        $boceto_id->update($request->all());
        $boceto_id->save();
        return $this->showOne($boceto_id);
    }

    
    public function destroy(Boceto $boceto_id)
    {
        $boceto_id->delete();
        return $this->showOne($boceto_id);
    }
}
