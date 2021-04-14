<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TransitoNacionalizacion extends Model
{
    public function recepcion()
    {
        return $this->hasOne(RecepcionReclamoDevolucion::class);
    }

    public function produccionTransito()
    {
        return $this->hasOne(ProduccionTransito::class, 'produccion_transito_id');
    }
}
