<?php

namespace App;

use App\Tarea;
use App\Producto;
use App\PivotTareaProveeder;
use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
   
   
    public function PrinciaplPivot()
    {
        return $this->hasMany(PivotTareaProveeder::class);
    }
    public function tarea()
    {
        return $this->belongsToMany(Tarea::class, 'pivot_tarea_proveeders', 'tarea_id', 'proveedor_id');
    }

   

    public function productos()
    {
        return $this->hasMany(Producto::class);
    }

    public function compra()
    {
        return $this->hasMany(Compra::class);
    }
}
