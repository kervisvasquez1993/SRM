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
            'hs_code' => '3306101090',
            'product_code' => 'PT-PM-100C',
            'brand' => 'MAXAM',
            'product_name' => 'MAXAM PREMIUM CHARCOAL TOOTHPASTE 100 GRAMS' ,
            'description' => ' esto es una descripcion',
            'shelf_life' => 36,
            'total_pcs' => 30.024 ,
            'pcs_unit' => 10.0,
            'pcs_inner_box' => 10.0 ,
            'pcs_ctn' =>  10.0,
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
            'hs_code' => '3306101090',
            'product_code' => 'PT-1065KS ',
            'brand' => 'MAXAM',
            'product_name' => 'KIDS TOOTHPASTE' ,
            'description' => ' esto es una descripcion',
            'shelf_life' => 36,
            'total_pcs' => 40.320 ,
            'pcs_unit' => 1,
            'pcs_inner_box' => 1,
            'pcs_ctn' =>  10.0,
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
