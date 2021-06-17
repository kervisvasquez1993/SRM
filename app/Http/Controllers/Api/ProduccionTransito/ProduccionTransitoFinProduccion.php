<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use auth;
use App\FinProduccion;
use App\ProduccionTransito;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\IncidenciaValidacion;
use Symfony\Component\HttpFoundation\Response;

class ProduccionTransitoFinProduccion extends ApiController
{
    private $validator_array = [
        'titulo' => 'required',
        'descripcion' => 'required'
    ];

    public function index($produccion_transito_id)
    {
        $produccion_transito = ProduccionTransito::findOrFail($produccion_transito_id);

        return $this->showAll($produccion_transito->finProduccion);
    }

    public function store(IncidenciaValidacion $request, $produccion_transito_id)
    {
        $request->validated();

        $fin_produccion = new FinProduccion();
        $produccion_transito = ProduccionTransito::findOrFail($produccion_transito_id);
        $fin_produccion->produccion_transito_id = $produccion_transito->id;
        $fin_produccion->user_id = auth()->user()->id;
        $fin_produccion->titulo = $request->titulo;
        $fin_produccion->descripcion = $request->descripcion;
        $fin_produccion->save();
        return $this->showOne($fin_produccion);
    }

    public function show($fin_produccion_id)
    {
        $fin_produccion_show = FinProduccion::findOrFail($fin_produccion_id);

        return $this->showOne($fin_produccion_show);
    }


    public function update(IncidenciaValidacion $request, $fin_produccion_id)
    {
        $request->validated();

        $fin_produccion_show = FinProduccion::findOrFail($fin_produccion_id);

        $fin_produccion_show->update($request->all());
        $fin_produccion_show->save();
        return $this->showOne($fin_produccion_show);
    }

    public function destroy($fin_produccion_id)
    {
        $fin_produccion_show = FinProduccion::findOrFail($fin_produccion_id);
        $fin_produccion_show->delete();
        return $this->showOne($fin_produccion_show);
    }
}
