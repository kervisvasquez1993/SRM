<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    
    protected $fillable = [
        'hs_code', 'product_code', 
        'brand',
        'description',
        'shelf_life',
        'total_pcs',
        'pcs_unit',
        'pcs_inner_box',
        'pcs_ctn',
        'ctn_packing_size_l',
        'ctn_packing_size_w',
        'ctn_packing_size_h',
        'cbm', 'peso_bruto', 
        'total_cbm',
        'total_peso_neto',
        'total_peso_bruto',
        'total_ctn',
        'corregido_total_pcs',
        'alto_carton',
        'total_pcs'
    ];

    public function pivot()
    {
        return $this->belongsTo(PivotTareaProveeder::class, 'pivot_tarea_proveeder_id');
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
