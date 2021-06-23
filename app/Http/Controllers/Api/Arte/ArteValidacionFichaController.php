<?php

namespace App\Http\Controllers\Api\Arte;

use App\Arte;
use App\User;
use App\ValidacionFicha;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Notifications\GeneralNotification;
use App\Http\Requests\IncidenciaValidacion;
use Illuminate\Support\Facades\Notification;

class ArteValidacionFichaController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($arte_id)
    {
        $arte = Arte::findOrFail($arte_id);
        return $this->showAll($arte->validacionFicha);
    }

   
    public function store(IncidenciaValidacion $request, $arte_id)
    {
        $validated = $request->validated();
        $arte = Arte::findOrFail($arte_id);
        $arte_ficha_validacion = new ValidacionFicha();
        $arte_ficha_validacion->arte_id = $arte->id;
        $arte_ficha_validacion->user_id = auth()->user()->id;
        $arte_ficha_validacion->titulo = $request->titulo;
        $arte_ficha_validacion->descripcion = $request->descripcion;
        $arte_ficha_validacion->save();
        $login_user = auth()->user()->name;
        $user_all   = User::where('rol', 'artes')->orWhere('rol', 'coordinador')->get();
        $comprador_asignado = User::find($arte->pivotTable->tarea->user_id);
        $user = $user_all->push($comprador_asignado)->unique('id');
        $text    = "El usuario '$login_user' agrego una incidencia asociada a validación de firchas";
        $link    = "/arts?id=$arte_ficha_validacion->id&tab=validacion_ficha";
        $type    = "validacion_ficha";
        Notification::send($user, new GeneralNotification($text, $link, $type));
        return $this->showOne($arte_ficha_validacion);
    }

  
    public function show($validacion_ficha_id)
    {
        $ficha_validacion = ValidacionFicha::findOrFail($validacion_ficha_id);
        return $this->showOne($ficha_validacion);
    }

   
    public function update(IncidenciaValidacion $request, $validacion_ficha_id)
    {
        $validated = $request->validated();
        $ficha_validacion = ValidacionFicha::findOrFail($validacion_ficha_id);
        $ficha_validacion->update($request->all());
        $ficha_validacion->save();
        return $this->showOne($ficha_validacion);
    }

    
    public function destroy($validacion_ficha_id)
    {
        $ficha_validacion = ValidacionFicha::findOrFail($validacion_ficha_id);
        $ficha_validacion->delete();
        return $this->showOne($ficha_validacion);
    }
}
