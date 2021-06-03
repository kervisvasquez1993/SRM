<?php

namespace App;

use App\Tarea;
use App\Producto;
use App\PivotTareaProveeder;
use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
   


    public function pivotTareaProveedor()
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

  

    public function filter()
    {
        return $this->hasMany(FilterProduccionTransito::class);
    }


    public function scopeFilterProductos($query, $productos)
    {
        return $query->when(count($productos), function($query){
            $query->with('productos', function($query, $productos){
                    $query->where('proveedor_id', $productos);
            });
          });/* ->when(count($compra), function($query)
          {
              $query->whith('compra_id', function($query, $compra){
                $query->where('proveedor_id', $compra);
              });
          }); */
    }
}
