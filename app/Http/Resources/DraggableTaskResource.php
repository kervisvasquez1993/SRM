<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DraggableTaskResource extends JsonResource
{
    public function toArray($request)
    {
        $tarea = $this->tarea;

        // La negociación seleccionada, incluyendo la información de producción y recepción
        $negociacion_seleccionada = $tarea
            ->pivotTareaProveedor()
            ->where('seleccionado', true)
            ->with('arte')
            ->with('produccionTransito')
            ->with('produccionTransito.recepcionReclamoDevolucion')
            ->first();

        // Esconder ciertos campos de la tarea
        $tarea->makeHidden(['pivotTareaProveedor', 'proveedores']);

        // Cargar el usuario de la tarea
        $tarea->usuario;

        $array = [
            'id' => $this->id,
            'row' => $this->row,
            'column' => $this->column,

            // Informacion de la tarea
            'tarea' => $tarea,

            // ¿La tarea tiene alguna negociacion con productos?
            'tiene_productos' => !$tarea->pivotTareaProveedor->where('productos_cargados', true)->isEmpty(),

            // ¿La tarea tiene algun pivot donde se haya iniciado producción o arte?
            'produccion_o_arte' => $tarea->pivotTareaProveedor()->where(function ($query) {
                return $query->where('iniciar_produccion', true)->orWhere('iniciar_arte', true);
            })->count() > 0,

            // La negociación seleccionada
            'negociacion_seleccionada' => $this->when($negociacion_seleccionada, function () use ($negociacion_seleccionada) {
                return $negociacion_seleccionada;
            }),
        ];

        return $array;
    }
}
