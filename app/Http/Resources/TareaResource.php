<?php

namespace App\Http\Resources;

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
        ];

        return parent::toArray($request);
    }
}
