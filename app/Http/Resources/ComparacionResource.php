<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ComparacionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            "nombre" => $this->nombre,
            "filas" => $this->filas()->with("celdas")->get(),
        ];
    }
}
