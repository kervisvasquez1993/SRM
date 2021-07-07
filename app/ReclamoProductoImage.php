<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReclamoProductoImage extends Model
{
    public function reclamoProducto()
    {
        return $this->belongsTo(ReclamoProducto::class, 'reclamo_producto_id');
    }
}
