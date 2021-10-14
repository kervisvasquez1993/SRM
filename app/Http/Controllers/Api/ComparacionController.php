<?php

namespace App\Http\Controllers\Api;

use App\Comparacion;
use App\Http\Controllers\ApiController;
use App\Tarea;
use Illuminate\Http\Request;

class ComparacionController extends ApiController
{
    public function index(Tarea $tarea)
    {
        return $tarea->comparaciones;
    }

    public function store(Request $request, Tarea $tarea)
    {
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

    public function destroy(Request $request, Comparacion $comparacion)
    {
        $comparacion->delete();
        return $this->showOne($comparacion);
    }
}
