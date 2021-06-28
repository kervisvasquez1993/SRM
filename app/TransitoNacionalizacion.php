<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TransitoNacionalizacion extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'titulo',
        'descripcion'
    ];
    
    public function recepcion()
    {
        return $this->hasOne(RecepcionReclamoDevolucion::class);
    }

    public function produccionTransito()
    {
        return $this->hasOne(ProduccionTransito::class, 'produccion_transito_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
