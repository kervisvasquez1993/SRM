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
                        'B' =>  $producto->hs_code,
                        'C' =>  $producto->product_code_supplier,
                        'D' =>  $producto->product_name_supplier,
                        'E' =>  $producto->brand_customer,
                        'F' =>  $producto->sub_brand_customer,
                        'G' =>  $producto->product_name_customer,
                        'H' =>  $producto->description,
                        'AC' => $producto->linea,
                        'AD' => $producto->categoria,
                        'AE' => $producto->sub_categoria,
                        'AF' => $producto->permiso_sanitario,
                        'AG' => $producto->cpe,
                        'AH' => $producto->num_referencia_empaque,
                        'AI' => $producto->u_m_unit,
                        'AJ' => $producto->codigo_de_barras_unit,
                        'AK' => $producto->u_m_inner_1,
                        'AL' => $producto->codigo_de_barras_inner_1,
                        'AM' => $producto->u_m_inner_2,
                        'AN' => $producto->codigo_barra_inner_2,
                        'AO' => $producto->u_m_outer,
                        'AP' => $producto->codigo_de_barras_outer,
                        'AQ' => $producto->codigo_interno_asignado,
                        'AR' => $producto->descripcion_asignada_sistema,

                    ];

                    if ($rol != "logistica") {
                        $valores = array_merge($valores, [
                            'J' => $producto->shelf_life,
                            'K' => $producto->total_pcs,
                            'L' => $producto->unit_price,
                            'M' => $producto->total_usd,
                            'N' => $producto->pcs_unit_packing,
                            'O' => $producto->pcs_inner1_box_paking,
                            'P' => $producto->pcs_inner2_box_paking,
                            'Q' => $producto->pcs_ctn_paking,
                            'R' => $producto->ctn_packing_size_l,
                            'S' => $producto->ctn_packing_size_w,
                            'T' => $producto->ctn_packing_size_h,
                            'U' => $producto->cbm,
                            'V' => $producto->n_w_ctn,
                            'W' => $producto->g_w_ctn,
                            'X' => $producto->total_ctn,
                            'X' => $producto->corregido_total_pcs,
                            'X' => $producto->total_cbm,
                            'X' => $producto->total_n_w,
                            'X' => $producto->total_g_w,
                          /*   '' => $producto->linea,
                            '' => $producto->categoria,
                            '' => $producto->sub_categoria,
                            '' => $producto->permiso_sanitario,
                            '' => $producto->cpe, */
                        ]);
                    }

                    $sheet->setCellValue("A$indice", $numero);

                    foreach ($valores as $letra => $valor) {
                        $sheet->setCellValue("$letra$indice", $valor);
                    }

                    $sheet->setCellValue('M' . $indice, "=J$indice*K$indice");
                    $sheet->setCellValue('X' . $indice, "=IFERROR(J$indice/O$indice,0)");
                    $sheet->setCellValue('Z' . $indice, "=S$indice*V$indice");
                    $sheet->setCellValue('AA' . $indice, "=V$indice*T$indice");
                    $sheet->setCellValue('AB' . $indice, "=V$indice*U$indice");

                    $indice++;
                    $numero++;
                }

                return $event->getWriter()->getSheetByIndex(0);
            },
        ];
    }
}
