<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ComparacionFila extends Model
{
    protected $table = "comparacion_filas";
    public $timestamps = false;

    public function comparacion()
    {
        return $this->belongsTo(Comparacion::class, 'comparacion_id');
    }

    public function celdas()
    {
        return $this->hasMany(ComparacionCelda::class, "fila_id");
    }

}
