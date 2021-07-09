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

    protected $appends = ['usuario'];

    public function getUsuarioAttribute()
    {
        return $this->usuario()->first();
    }

    public function recepcionReclamoDevolucion()
    {
        return $this->belongsTo(RecepcionReclamoDevolucion::class);
    }
    public function imagenReclamo()
    {
        return $this->hasMany(ImagenReclamo::class);
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_login');
    }
}
