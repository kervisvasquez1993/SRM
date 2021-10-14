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
            'id' => $this->id,
            'pivot' => new PivotTareaProveederResource($this->pivotTable),
            'pagos' => $this->pagos,
            'inicio_produccion' => $this->inicio_produccion,
            'inicio_produccion_fecha' => $this->inicio_produccion_fecha,
            'fin_produccion' => $this->fin_produccion,
            'fin_produccion_fecha' => $this->fin_produccion_fecha,
            'salida_puerto_origen' => $this->salida_puerto_origen,
            'salida_puerto_origen_fecha' => $this->salida_puerto_origen_fecha,
            'transito' => $this->transito,
            'transito_fecha' => $this->transito_fecha,
            'nacionalizacion' => $this->nacionalizacion,
            'nacionalizacion_fecha' => $this->nacionalizacion_fecha,
            'fecha_entrega_aproximada' => $this->fecha_entrega_aproximada,
        ];

    }
}
