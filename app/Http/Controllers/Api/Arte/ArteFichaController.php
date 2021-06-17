<?php

namespace App\Http\Controllers\Api\Arte;

use App\Arte;
use App\Ficha;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

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


    public function store(Request $request, $arte_id)
    {
        $validator = Validator::make($request->all(), $this->validator_array);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $arte = Arte::findOrFail($arte_id);
        $arte_ficha = new Ficha();
        $arte_ficha->arte_id = $arte->id;
        $arte_ficha->user_id = auth()->user()->id;
        $arte_ficha->titulo = $request->titulo;
        $arte_ficha->descripcion = $request->descripcion;
        $arte_ficha->save();
        return $this->showOne($arte_ficha);
    }


    public function show($fichaId)
    {
        $ficha = Ficha::findOrFail($fichaId);
        return $this->showOne($ficha);
    }

    public function update(Request $request, $fichaId)
    {
        $validator = Validator::make($request->all(), $this->validator_array);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

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
