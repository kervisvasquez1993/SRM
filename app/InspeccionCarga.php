<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InspeccionCarga extends Model
{
   
   private $fillable =  [
        'recepcion_reclamo_devolucion_id',
        'user_id',
        'titulo',
        'descripcion'
    ];
   
    public function recepcionReclamoDevolucion()
    {
        return $this->hasOne(RecepcionReclamoDevolucion::class, 'recepcion_reclamo_devolucion_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
