<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PivotTareaProveederResource extends JsonResource
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
            'id'                  => $this->id,
            'tarea_id'            => $this->tarea_id,
            'proveedor_id'        => $this->proveedor_id,
            'productos_cargados' => $this->productos_cargados,
            'productos_confirmados' => $this->productos_confirmados,
            'seleccionado' => $this->seleccionado,
            'iniciar_arte'        => $this->iniciar_arte,
            'iniciar_produccion'  => $this->iniciar_produccion,
            'proveedor'           => $this->proveedor,
            'tarea'               => $this->tarea,
            'usuario'             => $this->tarea->usuarios,
            'total_ctn'           => $this->productos->sum('total_ctn'),
            'total_cbm'           => $this->productos->sum('total_cbm'),
            'total_n_w'           => $this->productos->sum('total_n_w'),
            'total_g_w'           => $this->productos->sum('total_g_w'),
            'compras_total'       => $this->compras->sum('total'),
            'compra_po'           => $this->compra_po,
            'payment_terms'       => $this->payment_terms,
            'hs_code'             => $this->hs_code,
            'incoterms'           => $this->incoterms,
            'delivery_time'       => $this->delivery_time,
        ];
    }
}
