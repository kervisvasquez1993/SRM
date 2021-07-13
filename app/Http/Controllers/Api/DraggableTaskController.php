<?php

namespace App\Http\Controllers\Api;

use App\DraggableTask;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\DraggableTaskResource;

class DraggableTaskController extends Controller
{
    public function index()
    {
        return DraggableTaskResource::collection(DraggableTask::all());
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, DraggableTask $draggableTask)
    {
        // Valores actuales
        $filaActual = $draggableTask->row;
        $columnaActual = $draggableTask->column;
        // La columna destino
        $columnaNueva = min((int)$request->column, 4);
        $columnaNueva = max(0, $columnaNueva);

        // Contar cuantas filas hay para limitar el indice de la fila nueva
        $totalFilas = DraggableTask::where('column', $columnaNueva)->count();

        // La fila destino
        $filaNueva = min((int)$request->row, $totalFilas);
        $filaNueva = max(0, $filaNueva);

        if ($columnaActual == $columnaNueva) {
            // Aqui se movera la tarea a otra fila de la misma columna

            // ¿Es el movimiento hacia arriba?
            $arriba = ($filaNueva > $filaActual);

            // Obtener el valor minimo y maximo
            $min = min($filaNueva, $filaActual);
            $max =  max($filaNueva, $filaActual);

            // Obtener todas las tareas comprendidas entre la fila nueva y la destino
            $cards = DraggableTask::where('column', $columnaNueva)
                ->whereBetween('row', [$min, $max])
                ->get();

            foreach ($cards as $card) {
                // Aqui no se quiera actualizar la tarea que se está moviendo
                if ($card->id != $draggableTask->id) {

                    if ($arriba) {
                        // Si el movimiento es hacia arriba, las tareas de en medio deben moverse una fila hacia abajo
                        $card->row =  $card->row - 1;
                    } else {
                        // Si el movimiento es hacia abajo, deben subir una fila
                        $card->row =  $card->row + 1;
                    }

                    $card->save();
                }
            }
        } else {
            // Obtener las tareas debajo de la tarea que se esta moviendo (sin incluirla)
            $cardsOrigen = DraggableTask::where('column', $columnaActual)
                ->where('row', '>', $filaActual)
                ->get();

            foreach ($cardsOrigen as $card) {+
                // Cada una de ellas se debe moverse una fila hacia abajo
                $card->row =  $card->row - 1;
                $card->save();
            }

            // Obtener las tareas debajo de la fila destino (incluyendo la propia fila destino)
            $cardsDestino = DraggableTask::where('column', $columnaNueva)
                ->where('row', '>=',  $filaNueva)
                ->get();

            foreach ($cardsDestino as $card) {
                // Cada una de ellas se debe moverse una fila hacia arriba
                $card->row =  $card->row + 1;
                $card->save();
            }
        }

        // Guardar la posicion nueva del card
        $draggableTask->column = $columnaNueva;
        $draggableTask->row = $filaNueva;
        $draggableTask->save();

        return new DraggableTaskResource($draggableTask);
    }
    
    public function destroy($id)
    {
        //
    }
}
