<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class, 'proveedor_id');
    }

    public function scopeFilterCompra($query, $proveedor)
    {
        return $query->when(count($proveedor), function($query) use ($proveedor){
            $query->whereIn('proveedor_id', $proveedor);
        });
    }
}
