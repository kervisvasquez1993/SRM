<?php

namespace App\Exports;

use App\Producto;
use Maatwebsite\Excel\Excel;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithPreCalculateFormulas;

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
                  'AA' => $producto->linea,
                  'AB' => $producto->categoria,
                  'AC' => $producto->sub_categoria,
                  'AD' => $producto->permiso_sanitario,
                  'AE' => $producto->cpe,
                  'AF' => $producto->num_referencia_empaque,
                  'AG' => $producto->codigo_de_barras_unit,
                  'AH' => $producto->codigo_de_barras_inner,
                  'AI' => $producto->codigo_de_barras_outer,
                  'AJ' => $producto->codigo_interno_asignado
               ];

               if ($rol != "logistica") {
                  $valores = array_merge($valores, [
                     'I' => $producto->shelf_life,
                     'J' => $producto->total_pcs,
                     'K' => $producto->unit_price,
                     'L' => $producto->total_usd,
                     'M' => $producto->pcs_unit_packing,
                     'N' => $producto->pcs_inner_box_paking,
                     'O' => $producto->pcs_ctn_paking,
                     'P' => $producto->ctn_packing_size_l,
                     'Q' => $producto->ctn_packing_size_w,
                     'R' => $producto->ctn_packing_size_h,
                     'S' => $producto->cbm,
                     'T' => $producto->n_w_ctn,
                     'U' => $producto->g_w_ctn,
                     'W' => $producto->corregido_total_pcs,
                     'AA' => $producto->linea,
                     'AB' => $producto->categoria,
                     'AC' => $producto->sub_categoria,
                     'AD' => $producto->permiso_sanitario,
                     'AE' => $producto->cpe,
                  ]);
               }

               $sheet->setCellValue("A$indice", $numero);

               foreach ($valores as $letra => $valor) {
                  error_log($letra . '4');
                  //$sheet->duplicateStyle($sheet->getStyle($letra . '4'), "$letra$indice");
                  $sheet->setCellValue("$letra$indice", $valor);
               }

               $sheet->setCellValue('L' . $indice, "=J$indice*K$indice");
               $sheet->setCellValue('V' . $indice, "=IFERROR(J$indice/O$indice,0)");
               $sheet->setCellValue('X' . $indice, "=S$indice*V$indice");
               $sheet->setCellValue('Y' . $indice, "=V$indice*T$indice");
               $sheet->setCellValue('Z' . $indice, "=V$indice*U$indice");

               $indice++;
               $numero++;
            }

            return $event->getWriter()->getSheetByIndex(0);
         }
      ];
   }
}
