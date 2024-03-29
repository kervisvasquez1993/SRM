<?php

namespace App\Exports;

use App\Producto;
use App\Tarea;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithPreCalculateFormulas;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Excel;
use Maatwebsite\Excel\Files\LocalTemporaryFile;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\MemoryDrawing;

function getCoordinate($col, $row)
{
    $colLetter = Coordinate::stringFromColumnIndex($col);
    $coordinate = "$colLetter$row";
    return $coordinate;
}

function getColumn($col)
{
    return Coordinate::stringFromColumnIndex($col);
}

function cellsToMergeByColsRow($start = -1, $end = -1, $row = -1)
{
    if ($start >= 0 && $end >= 0 && $row >= 0) {
        $start = Coordinate::stringFromColumnIndex($start);
        $end = Coordinate::stringFromColumnIndex($end);
        $merge = "$start{$row}:$end{$row}";
    }

    return $merge;
}

class ComparativaExport implements WithEvents, WithPreCalculateFormulas
{
    public $encabezadoEstilos = [
        'borders' => [
            'outline' => [
                'borderStyle' => Border::BORDER_THIN,
                'color' => ['rgb' => '000000'],
            ],
        ],
        'fill' => [
            'fillType' => Fill::FILL_SOLID,
            'startColor' => ['argb' => 'FF4F81BD'],
        ],
        'font' => [
            'color' => ['rgb' => 'ffffff'],
            'bold' => true,
        ],
    ];

    public $celdaEstilos = [
        'fill' => [
            'fillType' => Fill::FILL_SOLID,
            'startColor' => ['rgb' => 'ffffff'],
        ],
        'borders' => [
            'allBorders' => [
                'borderStyle' => Border::BORDER_THIN,
                'color' => ['rgb' => '000000'],
            ],
        ],
    ];

    public function __construct(Tarea $tarea, $exportador)
    {
        $this->tarea = $tarea;
        $this->exportador = $exportador;
    }

    public function registerEvents(): array
    {
        return [
            BeforeExport::class => function (BeforeExport $event) {
                $tarea = $this->tarea;
                $producto_columnas = 7;

                $writer = $event->getWriter();
                $writer->reopen(new LocalTemporaryFile(public_path('templates/vacio.xlsx')), Excel::XLSX);
                $negociaciones = $this->tarea->pivotTareaProveedor()->orderBy('id')->get();

                $sheet = $writer->getSheetByIndex(0);

                $sheet->getDefaultRowDimension()->setRowHeight(-1);

                // Habilitar el salto de texto dentro de una celdas
                $writer->getDefaultStyle()->getAlignment()->setWrapText(true);
                // Centrar el texto por defecto
                $writer->getDefaultStyle()->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
                $writer->getDefaultStyle()->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);

                $filaIndice = 1;

                // Definir el alto de la primera fila de encabezados
                $sheet->getRowDimension($filaIndice)->setRowHeight(50);

                // Crear los encabezados de las empresas
                foreach ($negociaciones as $i => $negociacion) {
                    $columna_inicio = $i * $producto_columnas + 2;
                    $columna_final = $columna_inicio + ($producto_columnas - 1);

                    $coordenada = getCoordinate($columna_inicio, $filaIndice);
                    // $sheet->setCellValueByColumnAndRow($i * $producto_columnas + 2, 1, $negociacion->proveedor->nombre);
                    $sheet->setCellValue($coordenada, $negociacion->proveedor->nombre);
                    // Combinar las celdas del titulo de la empresa
                    $sheet->mergeCells(cellsToMergeByColsRow($columna_inicio, $columna_final, $filaIndice));

                    // Ajustar el color
                    $columnaColorInicial = getColumn($columna_inicio);
                    $columnaColorFinal = getColumn($columna_final);
                    $sheet->getStyle("$columnaColorInicial" . "1:$columnaColorFinal" . "1")->applyFromArray($this->encabezadoEstilos);
                }

                // AJustar el ancho de la primera columna
                $sheet->getColumnDimension("A")->setWidth(30);

                $filaIndice++;

                // Definir el alto de la segunda fila de encabezados
                $sheet->getRowDimension($filaIndice)->setRowHeight(35);

                // Crear los encabezados de las caracteristicas de los productos
                foreach ($negociaciones as $i => $negociacion) {
                    $columna_inicio = $i * $producto_columnas + 2;

                    $coordenada = getCoordinate($columna_inicio, $filaIndice);
                    $sheet->setCellValue($coordenada, 'SUPPLIER CODE');
                    $sheet->getColumnDimension(getColumn($columna_inicio))->setWidth(20);
                    $sheet->getStyle($coordenada)->applyFromArray($this->encabezadoEstilos);
                    $columna_inicio++;

                    $coordenada = getCoordinate($columna_inicio, $filaIndice);
                    $sheet->setCellValue($coordenada, 'SUPPLIER NAME');
                    $sheet->getColumnDimension(getColumn($columna_inicio))->setWidth(20);
                    $sheet->getStyle($coordenada)->applyFromArray($this->encabezadoEstilos);
                    $columna_inicio++;

                    $coordenada = getCoordinate($columna_inicio, $filaIndice);
                    $sheet->setCellValue($coordenada, 'DESCRIPTION');
                    $sheet->getColumnDimension(getColumn($columna_inicio))->setWidth(25);
                    $sheet->getStyle($coordenada)->applyFromArray($this->encabezadoEstilos);
                    $columna_inicio++;

                    $coordenada = getCoordinate($columna_inicio, $filaIndice);
                    $sheet->setCellValue($coordenada, 'TOTAL PCS');
                    $sheet->getColumnDimension(getColumn($columna_inicio))->setWidth(15);
                    $sheet->getStyle($coordenada)->applyFromArray($this->encabezadoEstilos);
                    $columna_inicio++;

                    $coordenada = getCoordinate($columna_inicio, $filaIndice);
                    $sheet->setCellValue($coordenada, 'Unit Price');
                    $sheet->getColumnDimension(getColumn($columna_inicio))->setWidth(15);
                    $sheet->getStyle($coordenada)->applyFromArray($this->encabezadoEstilos);
                    $columna_inicio++;

                    $coordenada = getCoordinate($columna_inicio, $filaIndice);
                    $sheet->setCellValue($coordenada, 'Total USD');
                    $sheet->getColumnDimension(getColumn($columna_inicio))->setWidth(15);
                    $sheet->getStyle($coordenada)->applyFromArray($this->encabezadoEstilos);
                    $columna_inicio++;

                    $coordenada = getCoordinate($columna_inicio, $filaIndice);
                    $sheet->setCellValue($coordenada, 'Imagen');
                    $sheet->getColumnDimension(getColumn($columna_inicio))->setWidth(20);
                    $sheet->getStyle($coordenada)->applyFromArray($this->encabezadoEstilos);
                    $columna_inicio++;
                }

                $comparaciones = $tarea->comparaciones;

                // Contar cuantos producto hay
                $productos = $comparaciones->pluck("filas")->collapse()->pluck("celdas")->collapse();
                $cantidadProductos = $productos ->count();
                $productosAgregados = 0;

                $filaIndice++;

                foreach ($comparaciones as $comparacionIndice => $comparacion) {
                    $columna_inicio = 1;
                    $filasPorComparacion = 1;

                    $coordenada = getCoordinate($columna_inicio, $filaIndice);
                    $sheet->setCellValue($coordenada, $comparacion->nombre);
                    $columna_inicio++;

                    $filaInicioComparacion = $filaIndice;
                    $filasPorComparacion = 1;

                    foreach ($comparacion->filas as $fila) {
                        $filasParaAgregar = 0;

                        foreach ($negociaciones as $negociacionIndice => $negociacion) {
                            $productosAgregadosColumna = 0;

                            $celdas = $fila->celdas()->where("proveedor_id", $negociacion->proveedor->id)->orderBy("orden")->get();

                            foreach ($celdas as $productoIndice => $celdaProducto) {
                                $producto = $celdaProducto->producto;

                                $filaProducto = $filaIndice + $productoIndice;

                                $columna_inicio = 2 + ($negociacionIndice * $producto_columnas);

                                // Fondo
                                $columnaColorInicial = getColumn($columna_inicio);
                                $columnaColorFinal = getColumn($columna_inicio + $producto_columnas - 1);
                                
                                if ($celdaProducto->color) {
                                    $this->celdaEstilos["fill"]["startColor"]["rgb"] = $celdaProducto->color;
                                } else {
                                    $this->celdaEstilos["fill"]["startColor"]["rgb"] = "FFFFFF";
                                }
                                $sheet->getStyle($columnaColorInicial . $filaProducto . ":" . $columnaColorFinal . $filaProducto)
                                    ->applyFromArray($this->celdaEstilos);

                                // Codigo
                                $coordenada = getCoordinate($columna_inicio, $filaProducto);
                                $sheet->setCellValue($coordenada, $producto->product_code_supplier);
                                $columna_inicio++;

                                // Nombre
                                $coordenada = getCoordinate($columna_inicio, $filaProducto);
                                $sheet->setCellValue($coordenada, $producto->product_name_supplier);
                                $columna_inicio++;

                                $coordenada = getCoordinate($columna_inicio, $filaProducto);
                                $sheet->setCellValue($coordenada, $producto->description);
                                $columna_inicio++;
                                // Alinear la descripcion
                                $sheet->getStyle($coordenada)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
                                $sheet->getStyle($coordenada)->getAlignment()->setVertical(Alignment::VERTICAL_TOP);

                                $coordenada = getCoordinate($columna_inicio, $filaProducto);
                                $sheet->setCellValue($coordenada, $producto->total_pcs);
                                $columna_inicio++;

                                $coordenada = getCoordinate($columna_inicio, $filaProducto);
                                $sheet->setCellValue($coordenada, $producto->unit_price);
                                $columna_inicio++;

                                $coordenada = getCoordinate($columna_inicio, $filaProducto);
                                $sheet->setCellValue($coordenada, $producto->total_usd);
                                $columna_inicio++;

                                $sheet->getRowDimension($filaProducto)->setRowHeight(100);

                                //      Agregar la imagen
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
                                    $coordenada = getCoordinate($columna_inicio, $filaProducto);
                                    $drawing = new MemoryDrawing();
                                    $drawing->setResizeProportional(true);
                                    $drawing->setImageResource($imagen);
                                    $drawing->setCoordinates($coordenada);
                                    $drawing->setOffsetX(2);
                                    $drawing->setOffsetY(2);

                                    if ($ancho > $alto) {
                                        $drawing->setWidth(120);
                                    } else {
                                        $drawing->setHeight(120);
                                    }

                                    $drawing->setWorksheet($writer->getActiveSheet());

                                    // Eliminar la memoria de la RAM
                                    imagedestroy($imagen);
                                }

                                $this->exportador->informarProgreso($productosAgregados / $cantidadProductos);

                                $productosAgregadosColumna++;
                                $productosAgregados++;
                            }

                            if ($productosAgregadosColumna > $filasParaAgregar) {
                                $filasParaAgregar = $productosAgregadosColumna;
                            }
                        }
                        $filaIndice += $filasParaAgregar;
                        $filasPorComparacion += $filasParaAgregar;
                    }

                    // foreach ($comparacion->rows as $filaIndiceIndice => $fila) {
                    //     // $filaIndice++;
                    //     $filasParaAgregar = 0;

                    //     foreach ($fila->columns as $columnaIndice => $columna) {
                    //         $productosAgregados = 0;

                    //         foreach ($columna as $productoIndice => $celdaProducto) {
                    //             $producto = Producto::find($celdaProducto->id);

                    //             if ($producto) {

                    //                 $filaProducto = $filaIndice + $productoIndice;

                    //                 $columna_inicio = 2 + ($columnaIndice * $producto_columnas);

                    //                 // Fondo
                    //                 $columnaColorInicial = getColumn($columna_inicio);
                    //                 $columnaColorFinal = getColumn($columna_inicio + $producto_columnas - 1);
                    //                 if (property_exists($celdaProducto, 'backgroundColor')) {
                    //                     $this->celdaEstilos["fill"]["startColor"]["rgb"] = $celdaProducto->backgroundColor;
                    //                 } else {
                    //                     $this->celdaEstilos["fill"]["startColor"]["rgb"] = "ffffff";
                    //                 }
                    //                 $sheet->getStyle($columnaColorInicial . $filaProducto . ":" . $columnaColorFinal . $filaProducto)
                    //                     ->applyFromArray($this->celdaEstilos);

                    //                 // Codigo
                    //                 $coordenada = getCoordinate($columna_inicio, $filaProducto);
                    //                 $sheet->setCellValue($coordenada, $producto->product_code_supplier);
                    //                 $columna_inicio++;

                    //                 // Nombre
                    //                 $coordenada = getCoordinate($columna_inicio, $filaProducto);
                    //                 $sheet->setCellValue($coordenada, $producto->product_name_supplier);
                    //                 $columna_inicio++;

                    //                 $coordenada = getCoordinate($columna_inicio, $filaProducto);
                    //                 $sheet->setCellValue($coordenada, $producto->description);
                    //                 $columna_inicio++;
                    //                 // Alinear la descripcion
                    //                 $sheet->getStyle($coordenada)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
                    //                 $sheet->getStyle($coordenada)->getAlignment()->setVertical(Alignment::VERTICAL_TOP);

                    //                 $coordenada = getCoordinate($columna_inicio, $filaProducto);
                    //                 $sheet->setCellValue($coordenada, $producto->total_pcs);
                    //                 $columna_inicio++;

                    //                 $coordenada = getCoordinate($columna_inicio, $filaProducto);
                    //                 $sheet->setCellValue($coordenada, $producto->unit_price);
                    //                 $columna_inicio++;

                    //                 $coordenada = getCoordinate($columna_inicio, $filaProducto);
                    //                 $sheet->setCellValue($coordenada, $producto->total_usd);
                    //                 $columna_inicio++;

                    //                 $sheet->getRowDimension($filaProducto)->setRowHeight(100);

                    //                 //      Agregar la imagen
                    //                 if ($producto->imagen) {
                    //                     $url = "https://srmdnamics-laravel-file.s3.us-east-2.amazonaws.com/{$producto->imagen}";

                    //                     $imagen = file_get_contents($url);
                    //                     $imagen = imagecreatefromstring($imagen);
                    //                     $ancho = imagesx($imagen);
                    //                     $alto = imagesy($imagen);

                    //                     // Insertarla en el excel
                    //                     $coordenada = getCoordinate($columna_inicio, $filaProducto);
                    //                     $drawing = new MemoryDrawing();
                    //                     $drawing->setResizeProportional(true);
                    //                     $drawing->setImageResource($imagen);
                    //                     $drawing->setCoordinates($coordenada);
                    //                     $drawing->setOffsetX(2);
                    //                     $drawing->setOffsetY(2);

                    //                     if ($ancho > $alto) {
                    //                         $drawing->setWidth(120);
                    //                     } else {
                    //                         $drawing->setHeight(120);
                    //                     }

                    //                     $drawing->setWorksheet($writer->getActiveSheet());

                    //                     error_log($url);
                    //                 }

                    //                 // $filaIndice += 1;
                    //                 $productosAgregados++;
                    //             }

                    //             // $filaIndice += 1;
                    //         }

                    //         if ($productosAgregados > $filasParaAgregar) {
                    //             $filasParaAgregar = $productosAgregados;
                    //         }
                    //     }
                    //     $filaIndice += $filasParaAgregar;
                    //     $filasPorComparacion += $filasParaAgregar;
                    // }

                    // Ajustar el color
                    $sheet->getStyle("A$filaInicioComparacion" . ":A" . ($filaInicioComparacion + $filasPorComparacion - 2))->applyFromArray($this->encabezadoEstilos);
                }

                // foreach ($sheet->getRowDimensions() as $rd) {
                //     $rd->setRowHeight(-1);
                // }

                // Congelar los headers antes de la celda B3
                $sheet->freezePane("B3");

                return $sheet;
            },
        ];
    }
}
