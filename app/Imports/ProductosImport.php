<?php

namespace App\Imports;

use App\Producto;
use Maatwebsite\Excel\Concerns\ToModel;

class ProductosImport implements ToModel
{
    
    public $pivot_id;
        
    public function __construct($pivot_id)
    {
        $this->pivot_id = $pivot_id; // errro en en linea
    }
    public function model(array $row)
    {
        return new Producto([
        'pivot_tarea_proveeder_id' => $this->pivot_id,
        'hs_code'              => $row[0],
        'product_code'         => $row[1],
        'description'          => $row[2],
        'brand'                => $row[3],
        'product_name'         => $row[4],
        'total_pcs'            => $row[5],
        'shelf_life'           => $row[6],
        'total_pcs'            => $row[7],
        'pcs_unit'             => $row[8],
        'pcs_inner_box'        => $row[9],
        'pcs_ctn'              => $row[10],
        'ctn_packing_size_l'   => $row[11],
        'ctn_packing_size_w'   => $row[12],
        'ctn_packing_size_h'   => $row[13],
        'cbm'                  => $row[14],
        'n_w_ctn'              => $row[15],
        'g_w_ctn'              => $row[16],
        'total_ctn'            => $row[17],
        'corregido_total_pcs'  => $row[18],
        'total_cbm'            => $row[19],
        'total_n_w'            => $row[20],
        /* 'total_g_w'            => $row[21], */
        ]);
    }
}
