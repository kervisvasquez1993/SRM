<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RecepcionReclamoDevolucion extends Model
{
    public function ProduccionTransito()
    {
        return $this->belongsTo(TransitoNacionalizacion::class, 'transito_nacionalizacions_id');
    }
}
