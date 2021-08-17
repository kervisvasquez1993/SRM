<?php

namespace App\Exports;

use App\Producto;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithPreCalculateFormulas;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Excel;

class ProductosExport implements WithEvents, WithPreCalculateFormulas
{
    public function __construct($producto)
    {
        $this->producto = $producto; // errro en en linea
    }
    public function registerEvents(): array
    {
        return [
            BeforeExport::class => function (BeforeExport $event) {
                $event->writer->reopen(new \Maatwebsite\Excel\Files\LocalTemporaryFile(public_path('templates/productos.xlsx')), Excel::XLSX);

                $sheet = $event->writer->getSheetByIndex(0);

                $productos = Producto::where('pivot_tarea_proveeder_id', $this->producto)->orderBy("id", "ASC")->get();
                $cantidad_productos = $productos->count();

                if ($cantidad_productos > 2) {
                    $cantidadAgregar = $cantidad_productos - 2;
                    $sheet->insertNewRowBefore(5, $cantidadAgregar);
                }

                $indice = 4;
                $numero = 1;

                foreach ($productos as $producto) {
                    $rol = Auth::user()->rol;
                    $valores = [
                        'B' => $producto->hs_code,
                        'C' => $producto->product_code_supplier,
                        'D' => $producto->product_name_supplier,
                        'E' => $producto->brand_customer,
                        'F' => $producto->sub_brand_customer,
                        'G' => $producto->product_name_customer,
                        'H' => $producto->description,
                        'AB' => $producto->linea,
                        'AC' => $producto->categoria,
                        'AD' => $producto->sub_categoria,
                        'AE' => $producto->permiso_sanitario,
                        'AF' => $producto->cpe,
                        'AG' => $producto->num_referencia_empaque,
                        'AH' => $producto->codigo_de_barras_unit,
                        'AI' => $producto->codigo_de_barras_inner,
                        'AJ' => $producto->codigo_de_barras_outer,
                        'AK' => $producto->codigo_interno_asignado,
                    ];

                    if ($rol != "logistica") {
                        $valores = array_merge($valores, [
                            'J' => $producto->shelf_life,
                            'K' => $producto->total_pcs,
                            'L' => $producto->unit_price,
                            'M' => $producto->total_usd,
                            'N' => $producto->pcs_unit_packing,
                            'O' => $producto->pcs_inner_box_paking,
                            'P' => $producto->pcs_ctn_paking,
                            'Q' => $producto->ctn_packing_size_l,
                            'R' => $producto->ctn_packing_size_w,
                            'S' => $producto->ctn_packing_size_h,
                            'T' => $producto->cbm,
                            'U' => $producto->n_w_ctn,
                            'V' => $producto->g_w_ctn,
                            'X' => $producto->corregido_total_pcs,
                            'AB' => $producto->linea,
                            'AC' => $producto->categoria,
                            'AD' => $producto->sub_categoria,
                            'AE' => $producto->permiso_sanitario,
                            'AF' => $producto->cpe,
                        ]);
                    }

                    $sheet->setCellValue("A$indice", $numero);

                    foreach ($valores as $letra => $valor) {
                        $sheet->setCellValue("$letra$indice", $valor);
                    }

                    $sheet->setCellValue('M' . $indice, "=K$indice*L$indice");
                    $sheet->setCellValue('W' . $indice, "=IFERROR(K$indice/P$indice,0)");
                    $sheet->setCellValue('Y' . $indice, "=T$indice*W$indice");
                    $sheet->setCellValue('Z' . $indice, "=U$indice*W$indice");
                    $sheet->setCellValue('AA' . $indice, "=V$indice*W$indice");

                    $indice++;
                    $numero++;
                }

                return $event->getWriter()->getSheetByIndex(0);
            },
        ];
    }
}
