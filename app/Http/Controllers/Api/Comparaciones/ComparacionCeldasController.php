<?php

namespace App\Http\Controllers\Api\Comparaciones;

use App\Comparacion;
use App\ComparacionCelda;
use App\ComparacionFila;
use App\Http\Controllers\ApiController;
use App\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ComparacionCeldasController extends ApiController
{
    private $validacionUpdate = [
        'fila_id' => 'required|integer',
        'orden' => 'required|integer',
    ];

    private $validacionStore = [
        'proveedor_id' => 'required|integer',
        'producto_id' => 'required|integer',
    ];

    public function index(ComparacionFila $fila)
    {
        return $fila->celdas;
    }

    public function store(Request $request, ComparacionFila $fila)
    {
        // Validación
        $validator = Validator::make($request->all(), $this->validacionStore);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        // Determinar si existe la negociación con el proveedor
        $negociacion = $fila->comparacion->tarea->negociaciones()->where('proveedor_id', $request->proveedor_id)->firstOrFail();
        $proveedor = $negociacion->proveedor;

        // Determinar si existe el producto
        $producto = Producto::findOrFail($request->producto_id);
        if ($producto->pivot->tarea->id != $fila->comparacion->tarea->id) {
            return $this->errorResponse("El producto no tiene ninguna relacion con las negociaciones de esta tarea");
        }

        $filas = $fila->comparacion->filas()->with("celdas")->get();

        // No debe existir otro card con el mismo producto en la misma columna de proveedor
        $celdas = $filas->pluck("celdas")->flatten();
        if ($celdas->where("producto_id", $producto->id)->first()) {
            return $this->errorResponse("Ya existe un card con el mismo producto en la misma columna");
        }
        // Determinar la sub fila, sera determinada al sumarle 1 a la sub fila del ultimo card
        // de la misma fila y misma columna de proveedor
        $orden = ($fila->celdas()->where("proveedor_id", $proveedor->id)->max("orden") ?? -1) + 1;

        // Crear la celda
        $card = new ComparacionCelda();
        $card->producto_id = $producto->id;
        $card->proveedor_id = $proveedor->id;
        $card->orden = $orden;
        $fila->celdas()->save($card);

        return $this->showOne($card);
    }

    public function update(Request $request, ComparacionCelda $celda)
    {
        // Validación
        $validator = Validator::make($request->all(), $this->validacionUpdate);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        // Fila original
        $filaOriginal = $celda->fila;

        // Fila destino
        error_log($celda->fila->comparacion->filas);
        $filaDestino = $celda->fila->comparacion->filas()->findOrFail($request->fila_id);
        

        // Indice original
        $indiceOriginal = $celda->orden;

        // Indice destinado
        $maximoIndiceDestino = $filaDestino
            ->celdas()
            ->where("proveedor_id", $celda->proveedor_id)
            ->max("orden");
        $cantidadCeldasDestino = $filaDestino
            ->celdas()
            ->where("proveedor_id", $celda->proveedor_id)
            ->count();

        $maximoIndiceDestino = $cantidadCeldasDestino > 0 ? ($maximoIndiceDestino + 1) : 0;

        $indiceDestino = (int) $request->orden;
        $indiceDestino = max($indiceDestino, 0);
        $indiceDestino = min($indiceDestino, $maximoIndiceDestino);

        // Mover los cards de la fila origen hacia arriba
        $celdasOrigen = $filaOriginal
            ->celdas()
            ->where("proveedor_id", $celda->proveedor_id)
            ->where("orden", ">", $indiceOriginal)
            ->get();

        foreach ($celdasOrigen as $_celda) {
            $_celda->orden--;
            $_celda->save();
        }

        // Mover los cards de la fila destino hacia abajo
        $celdasDestino = $filaDestino
            ->celdas()
            ->where("proveedor_id", $celda->proveedor_id)
            ->where("orden", ">=", $indiceDestino)
            ->get();

        foreach ($celdasDestino as $_celda) {
            if ($_celda->id != $celda->id) {
                $_celda->orden++;
                $_celda->save();
            }
        }

        // Guardar la celda
        $celda->orden = $indiceDestino;
        $filaDestino->celdas()->save($celda);

        return $this->showOne($celda);
    }

    public function destroy(ComparacionCelda $celda)
    {
        // Mover las celdas que esten debajo hacia arriba
        $celdasAbajo = $celda
            ->fila
            ->celdas()
            ->where("proveedor_id", $celda->proveedor_id)
            ->where("orden", ">", $celda->orden)
            ->get();

        foreach ($celdasAbajo as $_celda) {
            $_celda->orden--;
            $_celda->save();
        }

        $celda->delete();
        return $this->showOne($celda);
    }
}
