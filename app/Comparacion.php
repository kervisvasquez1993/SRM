<?php

namespace App;

use App\ComparacionCard;
use Illuminate\Database\Eloquent\Model;

class Comparacion extends Model
{
    protected $fillable = ["nombre"];
    protected $table = 'comparaciones';

    public function tarea()
    {
        return $this->belongsTo(Tarea::class, 'tarea_id');
    }

    public function filas()
    {
        return $this->hasMany(ComparacionFila::class)->orderBy('orden');
    }
}
