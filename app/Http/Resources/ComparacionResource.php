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

            // Incluir un arreglo de productos si las filas fueron cargadas
            // "productos" => $this->when($this->relationLoaded("filas"), function () {
            //     return $this->tarea->pivotTareaProveedor->pluck("productos")->collapse();
            // }),

            // Incluir las filas solo si fueron cargadas
            "filas" => $this->whenLoaded("filas"),
        ];
    }
}
