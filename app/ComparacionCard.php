<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ComparacionCard extends Model
{
    protected $fillable = ["proveedor_id"];
    protected $table = "comparacion_cards";

    public function comparacion()
    {
        return $this->belongsTo(Comparacion::class, 'comparacion_id');
    }

}
