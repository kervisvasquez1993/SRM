<?php

namespace App\Http\Resources;

use App\PivotTareaProveeder;
use Illuminate\Http\Resources\Json\JsonResource;

class ArchivadoResource extends JsonResource
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
            'pivot_tarea_proveeder_id' => PivotTareaProveeder::find($this->pivot_tarea_proveeder_id),
            'tarea' => PivotTareaProveeder::find($this->pivot_tarea_proveeder_id)->tarea,
            'proveedor' => PivotTareaProveeder::find($this->pivot_tarea_proveeder_id)->proveedor,
            'productos' => PivotTareaProveeder::find($this->pivot_tarea_proveeder_id)->productos,
        ];
    }
}
