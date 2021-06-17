<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use App\ProduccionTransito;
use Illuminate\Http\Request;
use App\TransitoNacionalizacion;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\IncidenciaValidacion;
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
