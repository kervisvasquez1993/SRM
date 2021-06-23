<?php

namespace App\Http\Controllers\Api\Arte;

use App\Arte;
use App\User;
use App\ValidacionBoceto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Notifications\GeneralNotification;
use App\Http\Requests\IncidenciaValidacion;
use Illuminate\Support\Facades\Notification;

class ArteValidacionBocetoController extends ApiController
{
   
    public function index($arte_id)
    {
        $arte = Arte::findOrFail($arte_id);
        return $this->showAll($arte->validacionBoceto);
    }

    public function store(IncidenciaValidacion $request, $arte_id)
    {
        $validated = $request->validated();
        $arte = Arte::findOrFail($arte_id);
        $validacion_boceto = new ValidacionBoceto();
        $validacion_boceto->arte_id = $arte->id;
        $validacion_boceto->user_id = auth()->user()->id;
        $validacion_boceto->titulo = $request->titulo;
        $validacion_boceto->descripcion = $request->descripcion;
        $validacion_boceto->save();
        $login_user = auth()->user()->name;
        $user_all   = User::where('rol', 'artes')->orWhere('rol', 'coordinador')->get();
        $comprador_asignado = User::find($arte->pivotTable->tarea->user_id);
        $user = $user_all->push($comprador_asignado)->unique('id');
        $text    = "El usuario '$login_user' agrego una incidencia asociada a validación de boceto";
        $link    = "/arts?id=$validacion_boceto->id&tab=validacion_boceto";
        $type    = "validacion_boceto";
        Notification::send($user, new GeneralNotification($text, $link, $type));
        return $this->showOne($validacion_boceto);
    }

  
    public function show(ValidacionBoceto $validacion_boceto_id)
    {
        return $validacion_boceto_id;
    }

    
    public function update(IncidenciaValidacion $request, ValidacionBoceto $validacion_boceto_id)
    {
        $validated = $request->validated();
        $validacion_boceto_id->update($request->all());
        $validacion_boceto_id->save();
        return $this->showOne($validacion_boceto_id);
    }

    public function destroy(ValidacionBoceto $validacion_boceto_id)
    {
        $validacion_boceto_id->delete();
        return $this->showOne($validacion_boceto_id);
    }
}
