<?php

namespace App\Imports;

use App\Producto;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;


class ProductosImport implements WithStartRow, WithCalculatedFormulas //ToCollection, WithStartRow, WithCalculatedFormulas
{
    // public $pivot;

    // public function __construct($pivot)
    // {
    //     $this->pivot = $pivot; // errro en en linea
    // }

    // public function collection(Collection $rows)
    // {
    //     $productosAgregados = collect();

    //     // return $rows;
    //     foreach ($rows as $row) {
    //         $product = [
    //             'pivot_tarea_proveeder_id' => $this->pivot->id,
    //             'hs_code' => $row[1],
    //             'product_code_supplier' => $row[2],
    //             'product_name_supplier' => $row[3],
    //             'brand_customer' => $row[4],
    //             'sub_brand_customer' => $row[5],
    //             'product_name_customer' => $row[6],
    //             'description' => $row[7],
    //             'shelf_life' => $row[8],
    //             'total_pcs' => $row[9],
    //             'unit_price' => $row[10],
    //             'total_usd' => $row[11],
    //             'pcs_unit_packing' => $row[12],
    //             'pcs_inner_box_paking' => $row[13],
    //             'pcs_ctn_paking' => $row[14],
    //             'ctn_packing_size_l' => $row[15],
    //             'ctn_packing_size_w' => $row[16],
    //             'ctn_packing_size_h' => $row[17],
    //             'cbm' => $row[18],
    //             'n_w_ctn' => $row[19],
    //             'g_w_ctn' => $row[20],
    //             'total_ctn' => $row[21],
    //             'corregido_total_pcs' => $row[22],
    //             'total_cbm' => $row[23],
    //             'total_n_w' => $row[24],
    //             'total_g_w' => $row[25],
    //             'linea' => $row[26],
    //             'categoria' => $row[27],
    //             'sub_categoria' => $row[28],
    //             'permiso_sanitario' => $row[29],
    //             'cpe' => $row[30],
    //             'num_referencia_empaque' => $row[31],
    //             'codigo_de_barra_unit' => $row[32],
    //             'codigo_de_barras_unit' => $row[33],
    //             'codigo_de_barras_inner' => $row[34],
    //             'codigo_de_barras_outer' => $row[35],
    //             'codigo_interno_asignado' => $row[36],
    //         ];

    //         $validator = Validator::make($product, [
    //             'product_name_supplier' => 'required'
    //         ]);

    //         if ($validator->fails()) {
    //             continue;
    //         }

    //         $productosAgregados->add($product);
    //         $producto =  Producto::where('product_name_supplier', $product['product_name_supplier'])->first();

    //         if ($producto) {
    //             error_log('se actualiza producto, con hola');
    //             $producto->update($product);
    //         } else {
    //             error_log('se crea uno nuevo, update');
    //             Producto::create($product);
    //         }
    //     }

    //     $productos = $this->pivot->productos;

    //     foreach ($productos as $producto) {
    //         $coincidencia = $productosAgregados->where('product_name_supplier', $producto->product_name_supplier)->first();

    //         if (!($coincidencia)) {
    //             error_log("eliminado");
    //             $producto->delete();
    //         }
    //     }
    // }

    // public function model(array $row)
    // {
    //     $product = [
    //         'pivot_tarea_proveeder_id' => $this->pivot_id,
    //         'hs_code' => $row[1],
    //         'product_code_supplier' => $row[2],
    //         'product_name_supplier' => $row[3],
    //         'brand_customer' => $row[4],
    //         'sub_brand_customer' => $row[5],
    //         'product_name_customer' => $row[6],
    //         'description' => $row[7],
    //         'shelf_life' => $row[8],
    //         'total_pcs' => $row[9],
    //         'unit_price' => $row[10],
    //         'total_usd' => $row[11],
    //         'pcs_unit_packing' => $row[12],
    //         'pcs_inner_box_paking' => $row[13],
    //         'pcs_ctn_paking' => $row[14],
    //         'ctn_packing_size_l' => $row[15],
    //         'ctn_packing_size_w' => $row[16],
    //         'ctn_packing_size_h' => $row[17],
    //         'cbm' => $row[18],
    //         'n_w_ctn' => $row[19],
    //         'g_w_ctn' => $row[20],
    //         'total_ctn' => $row[21],
    //         'corregido_total_pcs' => $row[22],
    //         'total_cbm' => $row[23],
    //         'total_n_w' => $row[24],
    //         'total_g_w' => $row[25],
    //         'linea' => $row[26],
    //         'categoria' => $row[27],
    //         'sub_categoria' => $row[28],
    //         'permiso_sanitario' => $row[29],
    //         'cpe' => $row[30],
    //         'num_referencia_empaque' => $row[31],
    //         'codigo_de_barra_unit' => $row[32],
    //         'codigo_de_barras_unit' => $row[33],
    //         'codigo_de_barras_inner' => $row[34],
    //         'codigo_de_barras_outer' => $row[35],
    //         'codigo_interno_asignado' => $row[36],
    //     ];

    //     $validator = Validator::make($product, [

    //         'product_name_supplier' => 'required'

    //     ]);


    //     if ($validator->fails()) {
    //         return null;
    //     }


    //     $producto =  Producto::where('product_name_supplier', $product['product_name_supplier'])->first();



    //     if ($producto) {
    //         $producto->update($product);
    //         return null;
    //     }

    //     return new Producto($product);
    // }

    public function startRow(): int
    {
        return 4;
    }
}
