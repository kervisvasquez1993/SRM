<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReclamoProducto extends Model
{
    
    protected $fillable = 
    [
        'recepcion_reclamo_devolucion_id',
        'titulo',
        'user_login',
        'descripcion',
    ];

    public function recepcionReclamoDevolucion()
    {
        return $this->belongsTo(RecepcionReclamoDevolucion::class);
    }
    public function reclamoProductoImagen()
    {
        return $this->hasMany(ReclamoProducto::class);
    }
}
