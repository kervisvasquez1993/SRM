<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comparacion extends Model
{
    protected $fillable = ["nombre"];
    protected $table = 'comparaciones';

    public function tarea()
    {
        return $this->belongsTo(Tarea::class, 'tarea_id');
    }
}
