<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('productos')->insert([
            
            'proveedor_id' => 1,
            'hs_code' => '1234560',
            'product_code' => 'producto',
            'brand' => 'marca',
            'product_name' => 'producto1' ,
            'description' => ' esto es una descripcion',
            'shelf_life' => 'shelf_life',
            'total_pcs' => 10.0 ,
            'pcs_unit' => 10.0,
            'pcs_inner_box' => 10.0 ,
            'psm_ctn' =>  10.0,
            'ctn_packing_size_l' => 10.0 ,
            'ctn_packing_size_w' => 10.0 ,
            'ctn_packing_size_h' => 10.0 ,
            'cbm' => 10.0 ,
            'n_w_ctn' => 10.0,
            'g_w_ctn' => 10.0,
            'total_ctn' =>10.0 ,
            'corregido_total_pcs' => '10' ,
            'total_cbm' => '10' ,
            'total_n_w' =>  '10',
            'total_g_w' => '10' ,

        ]);
        DB::table('productos')->insert([
            
            'proveedor_id' => 2,
            'hs_code' => '1234560',
            'product_code' => 'producto',
            'brand' => 'marca',
            'product_name' => 'producto1' ,
            'description' => ' esto es una descripcion',
            'shelf_life' => 'shelf_life',
            'total_pcs' => 10.0 ,
            'pcs_unit' => 10.0,
            'pcs_inner_box' => 10.0 ,
            'psm_ctn' =>  10.0,
            'ctn_packing_size_l' => 10.0 ,
            'ctn_packing_size_w' => 10.0 ,
            'ctn_packing_size_h' => 10.0 ,
            'cbm' => 10.0 ,
            'n_w_ctn' => 10.0,
            'g_w_ctn' => 10.0,
            'total_ctn' =>10.0 ,
            'corregido_total_pcs' => '10' ,
            'total_cbm' => '10' ,
            'total_n_w' =>  '10',
            'total_g_w' => '10' ,

        ]);
    }
}
