<?php

namespace App;

use App\Tarea;
use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
   
   
    public function tarea()
    {
        return $this->belongsToMany(Tarea::class, 'pivot_tarea_proveeders', 'tarea_id', 'proveedor_id');
    }

    public function pivot()
    {
        return $this->hasMany(PivotTareaProveeder::class);
    }

    public function productos()
    {
        return $this->hasMany(Producto::class);
    }
}
