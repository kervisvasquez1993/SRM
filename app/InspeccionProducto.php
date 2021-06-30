<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InspeccionProducto extends Model
{
    
    protected $fillable = 
    [
        'recepcion_reclamo_devolucion_id',
        'titulo',
        'descripcion',
    ];

    public function recepcionReclamoDevolucion()
    {
        return $this->belongsTo(RecepcionReclamoDevolucion::class);
    }
}
