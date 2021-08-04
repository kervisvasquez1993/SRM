<?php

namespace App\Http\Resources;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Resources\Json\JsonResource;

class TareaResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'usuario' => $this->usuarios,
            'nombre' => $this->nombre,
            'descripcion' => $this->descripcion,
            'fecha_fin' => $this->fecha_fin,
            'created_at' => $this->created_at,
            'completada' => !$this->pivotTareaProveedor->where('iniciar_produccion', true)->where('iniciar_arte', true)->isEmpty(),
            'tiene_negociacion' => !$this->pivotTareaProveedor->where('productos_cargados', true)->isEmpty(),
            'cantidad_proveedores' => $this->proveedores->count()
        ];

        return parent::toArray($request);
    }
}
