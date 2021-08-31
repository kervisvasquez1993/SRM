<?php

namespace App\Http\Controllers\Api\Comparaciones;

use App\Comparacion;
use App\ComparacionCelda;
use App\ComparacionFila;
use App\Http\Controllers\ApiController;
use App\Http\Resources\ComparacionResource;
use App\Producto;
use App\Tarea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ComparacionController extends ApiController
{
    private $reglas_validacion = [
        'nombre' => 'required',
    ];

    public function productos(Tarea $tarea)
    {
        $productos = $tarea->pivotTareaProveedor->pluck("productos")->collapse();
        return $this->showAll($productos);
    }

    public function index(Tarea $tarea)
    {
        $comparaciones = $tarea->comparaciones()->with("filas.celdas")->get();
        $comparaciones = ComparacionResource::collection($comparaciones);
        return $this->showAllResources($comparaciones);
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

        // Crear una fila por defecto
        $fila = new ComparacionFila();
        $fila->orden = 0;
        $comparacion->filas()->save($fila);

        $this->manejarProductosMarcados($request, $comparacion);

        return $this->showOneResource(new ComparacionResource($comparacion));
    }

    public function show(Comparacion $comparacion)
    {
        return $this->showOneResource(new ComparacionResource($comparacion));
    }

    public function update(Request $request, Comparacion $comparacion)
    {
        $comparacion->update($request->all());
        $this->manejarProductosMarcados($request, $comparacion);
        return $this->showOneResource(new ComparacionResource($comparacion));
    }

    public function manejarProductosMarcados(Request $request, Comparacion $comparacion)
    {
        if ($request->has("checked_products")) {
            $celdas = $comparacion->filas()->with("celdas")->get()->pluck("celdas")->collapse();
            $agregados = collect([]);

            // Obtener la ultima fila
            $fila = $comparacion->filas->last();

            // Crear una fila si no existe ninguna
            if (!$fila) {
                $fila = new ComparacionFila();
                $fila->orden = 0;
                $comparacion->filas()->save($fila);
            }

            foreach ($request->checked_products as $idProducto) {
                // Tratar de encontrar una celda con el mismo producto
                $coincidencia = $celdas->where("producto_id", $idProducto)->first();

                // Si no se hayo ninguna, entonces se debe crear la celda
                if (!$coincidencia) {
                    $producto = Producto::findOrFail($idProducto);

                    // Determinar si existe la negociación con el proveedor
                    $proveedor = $producto->pivot->proveedor;

                    // Obtener la ultima posicion
                    $orden = ($fila->celdas()->where("proveedor_id", $proveedor->id)->max("orden") ?? -1) + 1;

                    // Crear la celda
                    $card = new ComparacionCelda();
                    $card->producto_id = $producto->id;
                    $card->proveedor_id = $proveedor->id;
                    $card->orden = $orden;
                    $fila->celdas()->save($card);
                }

                $agregados->add($idProducto);
            }

            // Verficar que productos fueron eliminados
            foreach ($celdas as $celda) {
                $coincidencia = $agregados->first(function ($item) use ($celda) {
                    return $item == $celda->producto_id;
                });

                if (!$coincidencia) {
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
                }
            }
        }

    }

    public function destroy(Comparacion $comparacion)
    {
        $comparacion->delete();
        return $this->showOneResource(new ComparacionResource($comparacion));
    }
}
