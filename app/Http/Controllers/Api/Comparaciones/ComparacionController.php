<?php

namespace App\Http\Controllers\Api\Comparaciones;

use App\Tarea;
use App\Comparacion;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ComparacionController extends ApiController
{
    private $reglas_validacion = [
        'nombre' => 'required',
    ];

    public function index(Tarea $tarea)
    {
        return $tarea->comparaciones()->with("cards")->get();
    }

    public function store(Request $request, Tarea $tarea)
    {
        // Validación
        $validator = Validator::make($request->all(), $this->reglas_validacion);
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $comparacion = new Comparacion();
        $comparacion->tarea_id = $tarea->id;
        $comparacion->fill($request->all());
        $comparacion->save();

        return $this->showOne($comparacion);
    }

    public function show(Comparacion $comparacion)
    {
        return $this->showOne($comparacion);
    }

    public function update(Request $request, Comparacion $comparacion)
    {
        $comparacion->update($request->all());
        return $this->showOne($comparacion);
    }

    public function destroy(Comparacion $comparacion)
    {
        $comparacion->delete();
        return $this->showOne($comparacion);
    }
}
