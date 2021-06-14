<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProduccionTransitoResource extends JsonResource
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
            'pivot' => new PivotTareaProveederResource($this->pivotTable),
            /* 'tarea' => $this->pivotTable->tarea->nombre, */
            'pagos' => $this->pagos,
            'inicio_produccion' => $this->inicio_produccion,
            'fin_produccion' => $this->fin_produccion,
            'transito_nacionalizacion' => $this->transito_nacionalizacion,
            'salida_puero_origen' => $this->salida_puero_origen,
        ];

    }
}
