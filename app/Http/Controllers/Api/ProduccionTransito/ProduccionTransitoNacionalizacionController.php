<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use App\User;
use App\ProduccionTransito;
use Illuminate\Http\Request;
use App\TransitoNacionalizacion;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use App\Notifications\GeneralNotification;
use App\Http\Requests\IncidenciaValidacion;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpFoundation\Response;

class ProduccionTransitoNacionalizacionController extends ApiController
{
    private $validator_array = [
        'titulo' => 'required',
        'descripcion' => 'required'
    ];

    public function index(Request $request, $produccion_transito_id)
    {
        $produccionTransito = ProduccionTransito::findOrFail($produccion_transito_id);
        return  $this->showAll($produccionTransito->transitosNacionalizacion);
    }


    public function store(IncidenciaValidacion $request, $produccion_transito_id)
    {
        $request->validated();
        $produccionTransito = ProduccionTransito::findOrFail($produccion_transito_id);
        $incidencias_transito = new TransitoNacionalizacion();
        $incidencias_transito->produccion_transito_id = $produccionTransito->id;
        $incidencias_transito->user_id = auth()->user()->id;
        $incidencias_transito->titulo = $request->titulo;
        $incidencias_transito->descripcion = $request->descripcion;
        $incidencias_transito->save();
        /* notificacion agregada */
        $login_user         = auth()->user()->name;
        $user_all           = User::where('rol', 'logistica')->orWhere('rol', 'coordinador')->get();
        $comprador_asignado = User::find($produccionTransito->pivotTable->tarea->user_id);
        $user               = $user_all->push($comprador_asignado)->unique('id');
        $text               = "El usuario '$login_user' agrego incidencia relacionada con transito nacionalización el  en la empresa: ".$produccionTransito->pivotTable->proveedor->nombre;
        $link               = "/productions?id=$produccionTransito->id&tab=incidencias_transito";
        $type               = "transito_normalizacion";
        Notification::send($user, new GeneralNotification($text, $link, $type));
        return $this->showOne($incidencias_transito);
    }


    public function show($incidencias_transito_id)
    {
        $incidencias_transito = TransitoNacionalizacion::findOrFail($incidencias_transito_id);
        return  $this->showOne($incidencias_transito);
    }


    public function update(IncidenciaValidacion $request, $incidencias_transito_id)
    {
        $request->validated();
        $incidencias_transito = TransitoNacionalizacion::findOrFail($incidencias_transito_id);
        $incidencias_transito->update($request->all());
        $incidencias_transito->save();
        return  $this->showOne($incidencias_transito);
    }


    public function destroy($incidencias_transito_id)
    {
        $incidencias_transito = TransitoNacionalizacion::findOrFail($incidencias_transito_id);
        $incidencias_transito->delete();
        return $this->showOne($incidencias_transito);
    }
}
