<?php

namespace App\Http\Controllers\Api\Comparaciones;

use App\Comparacion;
use App\ComparacionCard;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class ComparacionCardsController extends ApiController
{
    private $validacionUpdate = [
        'fila' => 'required|integer',
        'sub_fila' => 'required|integer',
    ];

    private $validacionStore = [
        'proveedor_id' => 'required|integer',
        'producto_id' => 'required|integer',
    ];

    public function index(Comparacion $comparacion)
    {
        return $comparacion->cards;
    }

    public function store(Request $request, Comparacion $comparacion)
    {
        // Validación
        $validator = Validator::make($request->all(), $this->validacionStore);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        // Determinar si existe la negociación con el proveedor
        $negociacion = $comparacion->tarea->negociaciones()->where('proveedor_id', $request->proveedor_id)->firstOrFail();
        $proveedor = $negociacion->proveedor;

        // Determinar si existe el producto
        $producto = $negociacion->productos()->findOrFail($request->producto_id);

        // No debe existir otro card con el mismo producto en la misma columna de proveedor
        if ($comparacion->cards()->where("producto_id", $producto->id)->where("proveedor_id", $proveedor->id)->first()) {
            return $this->errorResponse("Ya existe un card con el mismo producto en la misma columna");
        }

        // Determinar cual es la ultima fila para insertar el card allí
        $fila = $comparacion->cards()->max("fila") ?? 0;

        // Determinar la sub fila, sera determinada al sumarle 1 a la sub fila del ultimo card
        // de la misma fila y misma columna de proveedor
        $sub_fila = ($comparacion->cards()->where("fila", $fila)->where("proveedor_id", $proveedor->id)->max("sub_fila") ?? -1) + 1;

        $card = new ComparacionCard();
        $card->producto_id = $producto->id;
        $card->proveedor_id = $proveedor->id;
        $card->fila = $fila;
        $card->sub_fila = $sub_fila;
        $comparacion->cards()->save($card);

        return $this->showOne($card);
    }

    public function update(Request $request, Comparacion $comparacion, ComparacionCard $card)
    {
        // Validación
        $validator = Validator::make($request->all(), $this->validacionUpdate);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $cards = $comparacion->cards()->where("proveedor_id", $card->proveedor_id)->get();

        // Coordenadas de origen
        $filaOrigen = $card->fila;
        $subFilaOrigen = $card->sub_fila;

        // Fila destino
        $filaDestino = (int) $request->fila;
        $filaDestino = max($filaDestino, 0);

        // Sub fila destino
        $maximaSubFilaDestino = $cards->where("fila", $filaDestino)->max("sub_fila") ?? 0;
        $subFilaDestino = (int) $request->sub_fila;
        $subFilaDestino = max($subFilaDestino, 0);
        $subFilaDestino = min($subFilaDestino, $maximaSubFilaDestino);

        // Mover los cards de la fila de donde se movio una sub fila hacia arriba
        $cardsOrigen = $cards
            ->where("fila", $filaOrigen)
            ->where("sub_fila", ">=", $subFilaOrigen);

        foreach ($cardsOrigen as $_card) {
            $_card->sub_fila--;
            $_card->save();
        }

        // Mover los cards de la fila a donde se va a mover una sub fila hacia abajo
        $cardsDestino = $cards
            ->where("fila", $filaDestino)
            ->where("sub_fila", ">=", $subFilaDestino);

        foreach ($cardsDestino as $_card) {
            $_card->sub_fila++;
            $_card->save();
        }

        $card->fila = $filaDestino;
        $card->sub_fila = $subFilaDestino;
        $card->save();

        return $this->showOne($card);
    }

    public function destroy(Comparacion $comparacion, ComparacionCard $card)
    {
        $card->delete();
        return $this->showOne($card);
    }
}
