<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $fillable = [
        'pivot_tarea_proveeder_id',
        'hs_code',
        'product_code_supplier',
        'product_name_supplier',
        'brand_customer',
        'sub_brand_customer',
        'product_name_customer',
        'description',
        'imagen',
        'shelf_life',
        'total_pcs',
        'unit_price',
        'total_usd',
        'pcs_unit_packing',
        'pcs_inner1_box_paking',
        'pcs_inner2_box_paking',
        'pcs_ctn_paking',
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
        'linea',
        'categoria',
        'sub_categoria',
        'permiso_sanitario',
        'cpe',
        'num_referencia_empaque',
        'u_m_unit',
        'codigo_de_barras_unit',
        'u_m_inner_1',
        'codigo_de_barras_inner_1',
        'u_m_inner_2',
        'codigo_barra_inner_2',
        'u_m_outer',
        'codigo_de_barras_outer',
        'codigo_interno_asignado',
        'descripcion_asignada_sistema',

    ];

    protected $casts = [
        'shelf_life' => 'double',
        'total_pcs' => 'double',
        'unit_price' => 'double',
        'pcs_unit' => 'double',
        'total_usd' => 'double',
        'pcs_unit_packing' => 'double',
        'pcs_inner_box_paking' => 'double',
        'pcs_ctn_paking' => 'double',
        'ctn_packing_size_l' => 'double',
        'ctn_packing_size_w' => 'double',
        'ctn_packing_size_h' => 'double',
        'cbm' => 'double',
        'n_w_ctn' => 'double',
        'g_w_ctn' => 'double',
        'total_ctn' => 'double',
        'corregido_total_pcs' => 'double',
        'total_cbm' => 'double',
        'total_n_w' => 'double',
        'total_g_w' => 'double',
    ];

    public function pivot()
    {
        return $this->belongsTo(PivotTareaProveeder::class, 'pivot_tarea_proveeder_id');
    }

    // public function productOverview()
    // {
    //     return $this->belongsTo(ProductOverview::class);
    // }

    // public function scopeFilterProductos($query, $proveedor)
    // {
    //     return $query->when(count($proveedor), function ($query) use ($proveedor) {
    //         $query->whereIn('proveedor_id', $proveedor);
    //     });
    // }
}
