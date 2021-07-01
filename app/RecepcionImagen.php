<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RecepcionImagen extends Model
{
    protected $fillable = [
        'recepcion_reclamo_devolucion_id',
        'url',
        'name'
    ];

    public function inspecionProductos()
    {
        return $this->belongsTo(RecepcionReclamoDevolucion::class);
    }
}
