<?php

namespace App;

use App\Arte;
use App\Tarea;
use App\Proveedor;
use App\ProduccionTransito;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class PivotTareaProveeder extends Model
{
    public function compras()
    {
        return $this->hasMany(Compra::class);
    }

    public function productos()
     {
         return $this->hasMany(Producto::class);
     }
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
        return $this->hasMany(ProduccionTransito::class);
    }

   public function pivotFile()
   {
       return $this->hasMany(PivotFile::class);
   }
}
