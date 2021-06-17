<?php

namespace App\Http\Resources;

use App\User;
use Illuminate\Http\Resources\Json\JsonResource;

class PagoResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'produccion_transito_id' => $this->produccion_transito_id,
            'user_id' => $this->user_id,
            'user' => User::find($this->user_id),
            'monto' => $this->monto,
            'url_archivo_factura' => $this->url_archivo_factura,
            'tipo' => $this->tipo,
            'fecha' => $this->fecha
        ];
    }
}
