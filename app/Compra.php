<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    protected $fillable = [
        'pivot_tarea_proveeder_id',
        'item',
        'descripcion',
        'registro_salud',
        'cantidad_ctns',
        'price',
        'total',
        'comprador'
    ];

    protected $casts = [
        'cantidad_ctns' => 'double',
        'price' => 'double',
        'total' => 'double'
    ];

    public function pivot()
    {
        return $this->belongsTo(PivotTareaProveeder::class, 'pivot_tarea_proveeders_id');
    }

    public function scopeFilterCompra($query, $proveedor)
    {
        return $query->when(count($proveedor), function ($query) use ($proveedor) {
            $query->whereIn('proveedor_id', $proveedor);
        });
    }
}
