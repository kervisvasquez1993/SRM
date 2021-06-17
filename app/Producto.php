<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{

    protected $fillable = 
    [
        'pivot_tarea_proveeder_id',
        'hs_code',
        'product_code',
        'description',
        'brand',
        'product_name',
        'total_pcs',
        'shelf_life',
        'total_pcs',
        'pcs_unit',
        'pcs_inner_box',
        'pcs_ctn',
        'ctn_packing_size_l',
        'ctn_packing_size_w',
        'ctn_packing_size_h',
        'cbm',
        'n_w_ctn',
        'g_w_ctn',
        'total_ctn',
        'corregido_total_pcs',
        'total_cbm',
        'total_n_w',
        'total_g_w',
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
        return $query->when(count($proveedor), function ($query) use ($proveedor) {
            $query->whereIn('proveedor_id', $proveedor);
        });
    }
}
