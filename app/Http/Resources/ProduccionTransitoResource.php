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
        return 
        [
          'id' => $this->id,
          'pivot' => new PivotTareaProveederResource($this->pivotTable),
          'pagos' => $this->pagos,
          'inicio_produccion' => $this->inicio_produccion,
          'fin_produccion' => $this->fin_produccion,
          'salida_puero_origen' => $this->salida_puero_origen,
          'transito' => $this->transito,
          'nacionalizacion' => $this->nacionalizacion,
        ]; 

    }
}
