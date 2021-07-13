<?php

namespace App\Http\Resources;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Resources\Json\JsonResource;

class DraggableTaskResource extends JsonResource
{
    public function toArray($request)
    {
        $tarea = $this->tarea;

        

        $arte_iniciada = null;
        $negociacion_arte = $tarea->pivotTareaProveedor->where('iniciar_arte', true)->first();
        if ($negociacion_arte) {
            $arte_iniciada = $negociacion_arte->arte;
        }

        $negociacion_produccion =  $tarea->pivotTareaProveedor->where('iniciar_produccion', true)->first();
        $produccion_iniciada = null;
        if ($negociacion_produccion) {
            
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
        ];

        return  $array;
    }
}
