<?php

namespace App\Imports;

use App\Producto;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;
use Maatwebsite\Excel\Concerns\WithStartRow;


class ProductosImport implements ToModel, WithStartRow,WithCalculatedFormulas
{
    
    public $pivot_id;
        
    public function __construct($pivot_id)
    {
        $this->pivot_id = $pivot_id; // errro en en linea
    }
    public function model(array $row)
    {
      
        $product = [
        'pivot_tarea_proveeder_id' => $this->pivot_id,
        'hs_code'              => $row[1],
        'product_code'         => $row[2],
        'product_name_origin'  => $row[3],
        'brand'                => $row[4],
        'product_name'         => $row[5],
        'description'          => $row[6],
        'shelf_life'           => $row[7],
        'total_pcs'            => $row[8],
        'pcs_unit'             => $row[9],
        'pcs_inner_box'        => $row[10],
        'pcs_ctn'              => $row[11],
        'ctn_packing_size_l'   => $row[12],
        'ctn_packing_size_w'   => $row[13],
        'ctn_packing_size_h'   => $row[14],
        'cbm'                  => $row[15],
        'n_w_ctn'              => $row[16],
        'g_w_ctn'              => $row[17],
        'total_ctn'            => $row[18],
        'corregido_total_pcs'  => $row[19],
        'total_cbm'            => $row[20],
        'total_n_w'            => $row[21],
        'total_g_w'            => $row[22], 
        ];

        $validator = Validator::make($product, [
            
            'hs_code' => 'required',
            'product_code' => 'required',
            'description' => 'required',
            'product_name_origin' => 'required',
            'brand' => 'required',
            'product_name' => 'required',
            'total_pcs' => 'required',
            'shelf_life' => 'required',
            'total_pcs' => 'required',
            'pcs_unit' => 'required',
            'pcs_inner_box' => 'required',
            'pcs_ctn' => 'required',
            'ctn_packing_size_l' => 'required',
            'ctn_packing_size_w' => 'required',
            'ctn_packing_size_h' => 'required',
            'cbm' => 'required',
            'n_w_ctn' => 'required',
            'g_w_ctn' => 'required',
            'total_ctn' => 'required',
            'corregido_total_pcs' => 'required',
            'total_cbm' => 'required',
            'total_n_w' => 'required',
            'total_g_w' => 'required',            
        ]);

       
        if ($validator->fails())
        {
            return null;
        }
        

        return new Producto($product);
    }

    public function startRow(): int
    {
        return 22;
    }
}
