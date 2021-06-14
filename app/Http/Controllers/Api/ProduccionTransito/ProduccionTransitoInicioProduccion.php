<?php

namespace App\Http\Controllers\Api\ProduccionTransito;

use App\InicioProduccion;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ProduccionTransitoInicioProduccion extends ApiController
{
    private $validator_array = [
        'titulo' => 'required',
        'descripcion' => 'required'
    ];

    public function index(Request $request)
    {
        $inicioProduccion = InicioProduccion::where('produccion_transito_id', $request->produccion_transito_id)->get();
        return $this->showAll($inicioProduccion);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->validator_array);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $inicioProduccion = new InicioProduccion();
        $inicioProduccion->produccion_transito_id = $request->produccion_transito_id;
        $inicioProduccion->user_id = auth()->user()->id;
        $inicioProduccion->titulo = $request->titulo;
        $inicioProduccion->descripcion = $request->descripcion;
        $inicioProduccion->save();
        return $this->showOne($inicioProduccion);
    }


    public function show($inicioProduccion_id)
    {

    }

    public function update(Request $request, $inicioProduccion_id)
    {
        $validator = Validator::make($request->all(), $this->validator_array);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $inicioProduccion = InicioProduccion::findOrFail($inicioProduccion_id);
        $inicioProduccion->update($request->all());
        $inicioProduccion->save();
        return $this->showOne($inicioProduccion);
    }
    
    public function destroy($inicioProduccion_id)
    {
        $inicioProduccion = InicioProduccion::findOrFail($inicioProduccion_id);
        $inicioProduccion->delete();
        return $this->showOne($inicioProduccion);
    }
}
