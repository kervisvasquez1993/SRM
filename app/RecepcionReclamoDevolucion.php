<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RecepcionReclamoDevolucion extends Model
{
    public function ProduccionTransito()
    {
        return $this->belongsTo(ProduccionTransito::class, 'produccion_transito_id');
    }

    public function recepcionMercancia()
    {
        return $this->hasMany(RecepcionMercancia::class);
    }
}
