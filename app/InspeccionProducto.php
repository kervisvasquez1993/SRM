<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InspeccionProducto extends Model
{
    

    public function recepcionReclamoDevolucion()
    {
        return $this->belongsTo(RecepcionReclamoDevolucion::class);
    }
}
