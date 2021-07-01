<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ImagenReclamo extends Model
{
    protected $fillable = [
        
    ];
    public function ReclamoProducto()
    {
        return $this->belongsTo(ReclamoProducto::class, 'reclamo_producto_id');
    }
}
