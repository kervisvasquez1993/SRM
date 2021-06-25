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
use Illuminate\Support\Facades\Notification;

class ArteFichaController extends ApiController
{
    private $validator_array = [
        'titulo' => 'required',
        'descripcion' => 'required'
    ];

    public function index($arte_id)
    {
        $arte = Arte::findOrFail($arte_id);
        return $this->showAll($arte->ficha);
    }

    
    public function store(IncidenciaValidacion $request, $arte_id)
    {
        

        $request->validated();
        $arte = Arte::findOrFail($arte_id);
        $arte_ficha = new Ficha();
        $arte_ficha->arte_id     = $arte->id;
        $arte_ficha->user_id     = auth()->user()->id;
        $arte_ficha->titulo      = $request->titulo;
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
        return $this->showOne($arte_ficha);
    }


    public function show($fichaId)
    {
        $ficha = Ficha::findOrFail($fichaId);
        return $this->showOne($ficha);
    }

    public function update(IncidenciaValidacion $request, $fichaId)
    {
        $request->validated();
        $ficha = Ficha::findOrFail($fichaId);
        $ficha->update($request->all());
        $ficha->save();
        return $this->showOne($ficha);
    }


    public function destroy($fichaId)
    {
        $ficha = Ficha::findOrFail($fichaId);
        $ficha->delete();
        return $this->showOne($ficha);
    }
}
