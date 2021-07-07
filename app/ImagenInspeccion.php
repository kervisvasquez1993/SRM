<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ImagenInspeccion extends Model
{
    public function recepcionInspeccionReclamo()
    {
        return $this->belongsTo(RecepcionReclamoDevolucion::class, 'recepcion_reclamo_devolucion_id');
    }
}
