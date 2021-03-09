<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TransitoNacionalizacion extends Model
{
    public function recepcion()
    {
        return $this->hasOne(RecepcionReclamoDevolucion::class);
    }
}
