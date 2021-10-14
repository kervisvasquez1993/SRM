<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TareaResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'usuario' => $this->usuarios,
            'nombre' => $this->nombre,
            'descripcion' => $this->descripcion,
            'fecha_fin' => $this->fecha_fin,
            'created_at' => $this->created_at,
            'completada' => !$this->pivotTareaProveedor->where('iniciar_produccion', true)->where('iniciar_arte', true)->isEmpty(),
            'tiene_negociacion' => !$this->pivotTareaProveedor->where('productos_cargados', true)->isEmpty(),
            'negociaciones' => $this->when(
                $request->negociaciones,
                PivotTareaProveederResource::collection(
                    $this->pivotTareaProveedor()->orderBy('id')->get()
                )
            ),

            // Comparaciones
            'comparaciones' => $this->comparaciones,
            'archivo_comparacion_creado_en' => $this->archivo_comparacion_creado_en,
            'comparacion_editadas_en' => $this->comparacion_editadas_en,
            'exportando_comparacion' => $this->exportando_comparacion,
            'archivo_comparacion' => $this->archivo_comparacion,
        ];

        return parent::toArray($request);
    }
}
