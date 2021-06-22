<?php

namespace App\Http\Resources;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Resources\Json\JsonResource;

class ReclamoDevolucionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'produccion_transito_id' => $this->produccion_transito_id,
            'recepcion_mercancia' => $this->recepcion_mercancia,
            'inspeccion_carga' => $this->inspeccion_carga,
            'reclamos_devoluciones' => $this->reclamos_devoluciones,
            'pivot' => new PivotTareaProveederResource($this->ProduccionTransito->pivotTable)
        ];

        return parent::toArray($request);
    }
}
