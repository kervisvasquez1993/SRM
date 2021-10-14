<?php

namespace App\Http\Controllers\Api\Comparaciones;

use App\Comparacion;
use App\ComparacionFila;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;

class ComparacionFilasController extends ApiController
{
    public function index(Comparacion $comparacion)
    {
        return $comparacion->filas;
    }

    public function store(Request $request, Comparacion $comparacion)
    {
        // Determinar el orden para insertar la fila
        $orden = ($comparacion->filas()->max("orden") ?? -1) + 1;

        $fila = new ComparacionFila();
        $fila->orden = $orden;
        $comparacion->filas()->save($fila);

        return $this->showOne($fila);
    }

    public function update(Request $request, ComparacionFila $fila)
    {
        $filas = $fila->comparacion->filas;
        $ultimoIndice = $filas->max("orden") ?? 0;
        
        // Guardar una copia del orden de la fila
        $ordenOrigen = $fila->orden;

        // Limitar el orden en que se pondra la fila
        $ordenDestino = (int) $request->orden;
        $ordenDestino = max($ordenDestino, 0);
        $ordenDestino = min($ordenDestino, $ultimoIndice);

        // Mover hacia arriba las filas que esten debajo del orden origen
        $filasAbajo = $filas->where("orden", ">=", $ordenOrigen);
        foreach ($filasAbajo as $_fila) {
            if ($_fila->id != $fila->id) {
                $_fila->orden--;
                $_fila->save();
            }
        }

        // Mover hacia abajo las filas que esten debajo del orden destino
        $filasArriba = $filas->where("orden", ">=", $ordenDestino);
        foreach ($filasArriba as $_fila) {
            if ($_fila->id != $fila->id) {
                $_fila->orden++;
                $_fila->save();
            }
        }

        // Guardar la fila editada
        $fila->orden = $ordenDestino;
        $fila->save();
        return $this->showOne($fila);
    }

    public function destroy(ComparacionFila $fila)
    {
        // Mover hacia arriba las filas que esten debajo del orden origen
        $filasAbajo = $fila->comparacion->filas()->where("orden", ">=", $fila->orden)->get();
        foreach ($filasAbajo as $_fila) {
            $_fila->orden--;
            $_fila->save();
        }

        // Eliminar la fila
        $fila->delete();
        return $this->showOne($fila);
    }
}
