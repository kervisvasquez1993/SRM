<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PivotTareaProveeder extends Model
{
    public function tarea()
    {
        return $this->belongsTo(Tarea::class, 'tarea_id');
    }

    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class, 'proveedor_id');
    }

    public function artes()
    {
        return $this->hasMany(Arte::class);
    }
    public function produccionTransito()
    {
        return $this->hasMany(PivotTareaProveeder::class);
    }
}
