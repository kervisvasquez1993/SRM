<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use App\ProduccionTransito;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Resources\ProduccionTransitoResource;
use Symfony\Component\HttpFoundation\Response;

class ProduccionTransitoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $producionTransito = ProduccionTransito::all();
        $produccionTransitoResource = ProduccionTransitoResource::collection($producionTransito);
        return $this->showAllResources($produccionTransitoResource);
    }


    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ProduccionTransito  $produccionTransito
     * @return \Illuminate\Http\Response
     */
    public function show(ProduccionTransito $produccionTransito)
    {
        //
    }

    public function update(Request $request, ProduccionTransito $produccionTransito)
    {

        if ($request->fin_produccion && !$produccionTransito->inicio_produccion) {
            return $this->errorResponse('No Puede Finalizar la Proudccion si aun no la inicia', Response::HTTP_BAD_REQUEST);
        }

        if (!$request->inicio_produccion && $produccionTransito->fin_produccion) {
            return $this->errorResponse('ya finalizo la produccion no puede desmarcar inicio de produccion', Response::HTTP_BAD_REQUEST);
        }

        if (
            $request->salida_puero_origen && ($produccionTransito->pagos->isEmpty()
                || !$produccionTransito->inicio_produccion
                || !$produccionTransito->fin_produccion
                || $produccionTransito->pagos->sum('monto') < $produccionTransito->pivotTable->compras->sum('total')
                || !$produccionTransito->transito_nacionalizacion)
        ) {
            return $this->errorResponse('Debe tener todos los servicios finalizado', Response::HTTP_BAD_REQUEST);
        }

        $produccionTransito->update($request->all());
        $produccionTransito->save();
        return $this->showOneResource(new ProduccionTransitoResource($produccionTransito));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ProduccionTransito  $produccionTransito
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProduccionTransito $produccionTransito)
    {
        //
    }
}
