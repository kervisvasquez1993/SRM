<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ComparacionCelda extends Model
{
    protected $table = "comparacion_celdas";
    public $timestamps = false;

    public function fila()
    {
        return $this->belongsTo(ComparacionFila::class, 'fila_id');
    }

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}
