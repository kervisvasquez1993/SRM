<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    protected $fillable = [
      'orden_compra',
      'item',
      'descripcion',
      'registro_salud',
      'cantidad_pcs',
      'total',
      'comprador'
    ];
    public function pivot()
    {
        return $this->belongsTo(PivotTareaProveeder::class, 'pivot_tarea_proveeders_id');
    }

    public function scopeFilterCompra($query, $proveedor)
    {
        return $query->when(count($proveedor), function($query) use ($proveedor){
            $query->whereIn('proveedor_id', $proveedor);
        });
    }
}
