<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ArteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'tarea' => $this->pivotTable->tarea->nombre,
            'proveedor' => $this->pivotTable->proveedor->nombre,
            'creacion_fichas' => $this->creacion_fichas,
            'validacion_fichas' => $this->validacion_fichas,
            'creacion_boceto' => $this->creacion_boceto,
            'validacion_boceto' => $this->validacion_boceto,
            'confirmacion_proveedor' => $this->confirmacion_proveedor,
            'fecha_fin' => $this->fecha_fin,
            'codigo' => $this->pivotTable->compra_po
        ];
    }
}
