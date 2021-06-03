<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    public function pivot()
    {
        return $this->belongsTo(PivotTareaProveeder::class, 'pivot_id');
    }

    public function productOverview()
    {
        return $this->belongsTo(ProductOverview::class);
    }    
    public function scopeFilterProductos($query, $proveedor)
    {
        return $query->when(count($proveedor), function($query) use ($proveedor){
            $query->whereIn('proveedor_id', $proveedor);
        });
    }
    
}
