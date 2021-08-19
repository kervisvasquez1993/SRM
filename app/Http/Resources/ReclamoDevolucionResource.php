<?php

namespace App\Http\Resources;

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

            'fecha_recepcion_mercancia' => $this->fecha_recepcion_mercancia,
            'hora_llegada_contenedor' => $this->hora_llegada_contenedor,
            'hora_salida_contenedor' => $this->hora_salida_contenedor,
            'numero_precinto' => $this->numero_precinto,
            'numero_oc' => $this->numero_oc,
            'comprador' => $this->comprador,
            'importador' => $this->importador,
            'elaborado_por' => $this->elaborado_por,
            'verificado_por' => $this->verificado_por,
            'aprobado_por' => $this->aprobado_por,

            'pivot' => new PivotTareaProveederResource($this->ProduccionTransito->pivotTable),
        ];

        return parent::toArray($request);
    }
}
