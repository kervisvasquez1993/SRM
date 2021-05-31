<?php

namespace App\Http\Controllers\Api;

use App\Tarea;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\TareaResource;

class TareaController extends Controller
{
    public function __construct()
    {

    }

    public function index()
    {
        $tareas = Tarea::all();

        return TareaResource::collection($tareas);
    }

    public function store(Request $request)
    {

    }

    public function show(Tarea $tarea)
    {
        return new TareaResource($tarea);
    }

    public function update(Request $request, Tarea $tarea)
    {

    }

    public function destroy(Tarea $tarea)
    {
    }
}
