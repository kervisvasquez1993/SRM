<?php

namespace App\Http\Resources;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Resources\Json\JsonResource;

class DraggableTaskResource extends JsonResource
{
    public function toArray($request)
    {
        $tarea = $this->tarea;

        $codigo_po = null;

        $arte_iniciada = null;
        $negociacion_arte = $tarea->pivotTareaProveedor->where('iniciar_arte', true)->first();
        if ($negociacion_arte) {
            $codigo_po = $negociacion_arte->compra_po;
            $arte_iniciada = $negociacion_arte->arte;
        }

        $negociacion_produccion =  $tarea->pivotTareaProveedor->where('iniciar_produccion', true)->first();
        $produccion_iniciada = null;
        if ($negociacion_produccion) {
            $codigo_po = $negociacion_produccion->compra_po;
            $produccion_iniciada =  $negociacion_produccion->produccionTransito;
            $produccion_iniciada->recepcionReclamoDevolucion;
        }

        $array = [
            'id' => $this->id,
            'row' =>  $this->row,
            'column' =>  $this->column,
            'tarea_id' =>  $this->tarea_id,

            'usuario_nombre' => $tarea->usuario->name,
            'nombre' => $tarea->nombre,
            'fecha_fin' => $tarea->fecha_fin,
            'created_at' => $tarea->created_at,
            'cantidad_proveedores' => $tarea->proveedores->count(),

            'tiene_negociaciones' => !$tarea->pivotTareaProveedor->where('iniciar_negociacion', true)->isEmpty(),

            'arte_iniciada' => $arte_iniciada,
            'produccion_iniciada' =>  $produccion_iniciada,

            'codigo_po' => $codigo_po
        ];

        return  $array;
    }
}
