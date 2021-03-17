<?php

namespace App;

use App\Tarea;
use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
   
   
    public function pivot()
    {
        return $this->hasOne(PivotTareaProveeder::class);
    }
    public function tarea()
    {
        return $this->belongsToMany(Tarea::class, 'pivot_tarea_proveeders', 'tarea_id', 'proveedor_id');
    }

   

    public function productos()
    {
        return $this->hasMany(Producto::class);
    }
}
