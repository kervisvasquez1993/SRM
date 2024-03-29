<?php

namespace App\Exports;

use App\Jobs\ExportarProductosJob;
use App\PivotTareaProveeder;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithPreCalculateFormulas;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Excel;
use PhpOffice\PhpSpreadsheet\Worksheet\MemoryDrawing;

class ProductosExport implements WithEvents, WithPreCalculateFormulas
{
    public function __construct(PivotTareaProveeder $pivot, ExportarProductosJob $exportador)
    {
        $this->pivot = $pivot;
        $this->exportador = $exportador;
    }

    public function registerEvents(): array
    {
        return [
            BeforeExport::class => function (BeforeExport $event) {
                $event->writer->reopen(new \Maatwebsite\Excel\Files\LocalTemporaryFile(public_path('templates/productos.xlsx')), Excel::XLSX);

                $writer = $event->getWriter();
                $sheet = $writer->getSheetByIndex(0);

                $productos = $this->pivot->productos->sortBy("id");
                $cantidad_productos = $productos->count();

                if ($cantidad_productos > 2) {
                    $cantidadAgregar = $cantidad_productos - 2;
                    $sheet->insertNewRowBefore(5, $cantidadAgregar);
                }

                $indice = 4;
                $numero = 1;

                // Ajustar el ancho de la columna de la imagen
                $sheet->getColumnDimension("I")->setWidth(15);

                foreach ($productos as $producto) {
                    $valores = [
                        'B' => $producto->hs_code,
                        'C' => $producto->product_code_supplier,
                        'D' => $producto->product_name_supplier,
                        'E' => $producto->brand_customer,
                        'F' => $producto->sub_brand_customer,
                        'G' => $producto->product_name_customer,
                        'H' => $producto->description,
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
                    ];

                    $sheet->setCellValue("A$indice", $numero);

                    foreach ($valores as $letra => $valor) {
                        $sheet->setCellValue("$letra$indice", $valor);
                    }

                    $sheet->setCellValue('M' . $indice, "=J$indice*K$indice");
                    $sheet->setCellValue('X' . $indice, "=IFERROR(J$indice/O$indice,0)");
                    $sheet->setCellValue('Z' . $indice, "=S$indice*V$indice");
                    $sheet->setCellValue('AA' . $indice, "=V$indice*T$indice");
                    $sheet->setCellValue('AB' . $indice, "=V$indice*U$indice");

                    // Insertar imagen
                    if ($producto->imagen) {
                        $url = Storage::cloud()->url($producto->imagen);
                        error_log("Descargando imagen: $url");

                        // $imagen = file_get_contents($url);
                        $ch = curl_init();
                        curl_setopt($ch, CURLOPT_TIMEOUT, 60);
                        curl_setopt($ch, CURLOPT_URL, $url);
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                        $imagen = curl_exec($ch);

                        $imagen = imagecreatefromstring($imagen);
                        $ancho = imagesx($imagen);
                        $alto = imagesy($imagen);

                        // Insertarla en el excel
                        $drawing = new MemoryDrawing();
                        $drawing->setResizeProportional(true);
                        $drawing->setImageResource($imagen);
                        $drawing->setRenderingFunction(\PhpOffice\PhpSpreadsheet\Worksheet\MemoryDrawing::RENDERING_JPEG);
                        $drawing->setMimeType(\PhpOffice\PhpSpreadsheet\Worksheet\MemoryDrawing::MIMETYPE_DEFAULT);
                        $drawing->setCoordinates("I$indice");

                        if ($ancho > $alto) {
                            $drawing->setWidth(109);
                        } else {
                            $drawing->setHeight(109);
                        }

                        $drawing->setWorksheet($writer->getActiveSheet());

                        // Eliminar la memoria de la RAM
                        imagedestroy($imagen);
                    }

                    $indice++;
                    $numero++;

                    // Enviar la cantidad de productos
                    $this->exportador->informarProgreso(($numero - 1) / $cantidad_productos);
                }

                return $event->getWriter()->getSheetByIndex(0);
            },
        ];
    }
}
