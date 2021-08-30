<?php

namespace App\Http\Controllers\Api\Comparaciones;

use App\Comparacion;
use App\Http\Controllers\ApiController;
use App\Http\Resources\ComparacionResource;
use App\Tarea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ComparacionController extends ApiController
{
    private $reglas_validacion = [
        'nombre' => 'required',
    ];

    public function index(Tarea $tarea)
    {
        $comparaciones = $tarea->comparaciones()->with("filas.celdas")->get();
        return $this->showAllResources(ComparacionResource::collection($comparaciones));
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

        // Cargar el arreglo de filas para que se muestre en el resource
        $comparacion->filas;

        return $this->showOneResource(new ComparacionResource($comparacion));
    }

    public function show(Comparacion $comparacion)
    {
        return $this->showOneResource(new ComparacionResource($comparacion));
    }

    public function update(Request $request, Comparacion $comparacion)
    {
        $comparacion->update($request->all());
        return $this->showOneResource(new ComparacionResource($comparacion));
    }

    public function destroy(Comparacion $comparacion)
    {
        $comparacion->delete();
        return $this->showOneResource(new ComparacionResource($comparacion));
    }
}
