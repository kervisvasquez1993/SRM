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
        $productos = $this->productos;

        return [
            'id' => $this->id,
            'tarea_id' => $this->tarea_id,
            'proveedor_id' => $this->proveedor_id,
            'productos_cargados' => $this->productos_cargados,
            'productos_confirmados' => $this->productos_confirmados,
            'seleccionado' => $this->seleccionado,
            'iniciar_arte' => $this->iniciar_arte,
            'iniciar_produccion' => $this->iniciar_produccion,
            'orden_compra' => $this->orden_compra,
            'codigo_barra_finalizado' => $this->codigo_barra_finalizado,
            'base_grafico_finalizado' => $this->base_grafico_finalizado,
            'proveedor' => $this->proveedor,
            'tarea' => $this->tarea,
            'usuario' => $this->tarea->usuarios,
            // 'total_usd' => $productos->sum('total_usd'),
            'total_usd' => $this->total_pagar > 0 ? $this->total_pagar : $productos->sum('total_usd'),
            'total_ctn' => $productos->sum('total_ctn'),
            'total_cbm' => $productos->sum('total_cbm'),
            'total_n_w' => $productos->sum('total_n_w'),
            'total_g_w' => $productos->sum('total_g_w'),
            'productos' => $this->when($request->productos, $productos),
            'cantidad_productos' => $productos->count(),
            // 'compras_total' => $this->compras->sum('total'),
            'compras_total' => $this->total_pagar,
            'compra_po' => $this->compra_po,
            'payment_terms' => $this->payment_terms,
            'hs_code' => $this->hs_code,
            'incoterms' => $this->incoterms,
            'delivery_time' => $this->delivery_time,
            'nombre_archivo_orden_compra' => $this->nombre_archivo_orden_compra,
            'archivo_orden_compra' => $this->archivo_orden_compra,
            'orden_compra_directa' => $this->orden_compra_directa,
            'total_pagar' => $this->total_pagar,
        ];
    }
}
