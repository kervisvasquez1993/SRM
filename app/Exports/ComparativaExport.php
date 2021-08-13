<?php

namespace App\Exports;

use App\Tarea;
use App\Producto;
use Maatwebsite\Excel\Excel;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeExport;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use Maatwebsite\Excel\Concerns\WithPreCalculateFormulas;

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
    public function __construct(Tarea $tarea)
    {
        $this->tarea = $tarea;
    }

    public function registerEvents(): array
    {
        return [
            BeforeExport::class => function (BeforeExport $event) {
                $tarea = $this->tarea;
                $producto_columnas = 5;

                $writer = $event->getWriter();
                $writer->reopen(new \Maatwebsite\Excel\Files\LocalTemporaryFile(public_path('templates/vacio.xlsx')), Excel::XLSX);
                $negociaciones = $this->tarea->pivotTareaProveedor()->orderBy('id')->get();

                $sheet = $writer->getSheetByIndex(0);

                $sheet->getDefaultRowDimension()->setRowHeight(200);
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
                }

                // AJustar el ancho de la primera columna
                $sheet->getColumnDimension("A")->setWidth(20);

                $filaIndice++;

                // Definir el alto de la primera fila de encabezados
                $sheet->getRowDimension($filaIndice)->setRowHeight(35);

                // Crear los encabezados de las caracteristicas de los productos
                foreach ($negociaciones as $i => $negociacion) {
                    $columna_inicio = $i * $producto_columnas + 2;

                    $coordenada = getCoordinate($columna_inicio, $filaIndice);
                    $sheet->setCellValue($coordenada, 'SUPPLIER NAME');
                    $sheet->getColumnDimension(getColumn($columna_inicio))->setWidth(20);
                    $columna_inicio++;

                    $coordenada = getCoordinate($columna_inicio, $filaIndice);
                    $sheet->setCellValue($coordenada, 'DESCRIPTION');
                    $sheet->getColumnDimension(getColumn($columna_inicio))->setWidth(25);
                    $columna_inicio++;

                    $coordenada = getCoordinate($columna_inicio, $filaIndice);
                    $sheet->setCellValue($coordenada, 'TOTAL PCS');
                    $sheet->getColumnDimension(getColumn($columna_inicio))->setWidth(15);
                    $columna_inicio++;

                    $coordenada = getCoordinate($columna_inicio, $filaIndice);
                    $sheet->setCellValue($coordenada, 'Unit Price');
                    $sheet->getColumnDimension(getColumn($columna_inicio))->setWidth(15);
                    $columna_inicio++;

                    $coordenada = getCoordinate($columna_inicio, $filaIndice);
                    $sheet->setCellValue($coordenada, 'Total USD');
                    $sheet->getColumnDimension(getColumn($columna_inicio))->setWidth(15);
                    $columna_inicio++;
                }

                $filaIndice++;

                $comparaciones = json_decode($tarea->comparaciones);

                foreach ($comparaciones as $comparacionIndice => $comparacion) {
                    $columna_inicio = 1;

                    $coordenada = getCoordinate($columna_inicio, $filaIndice);
                    $sheet->setCellValue($coordenada, $comparacion->productName);
                    $columna_inicio++;

                    foreach ($comparacion->rows as $filaIndiceIndice => $fila) {
                        // $filaIndice++;
                        $filasParaAgregar = 0;

                        foreach ($fila->columns as $columnaIndice => $columna) {
                            $productosAgregados = 0;

                            foreach ($columna as $productoIndice => $productoId) {
                                $producto = Producto::find($productoId);

                                if ($producto) {
                                    
                                    $filaProducto =$filaIndice + $productoIndice;

                                    $columna_inicio = 2 + ($columnaIndice * $producto_columnas);

                                    $coordenada = getCoordinate($columna_inicio, $filaProducto);
                                    $sheet->setCellValue($coordenada, $producto->product_name_supplier);
                                    $columna_inicio++;

                                    $coordenada = getCoordinate($columna_inicio, $filaProducto);
                                    $sheet->setCellValue($coordenada, $producto->description);
                                    $columna_inicio++;

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

                                    // $filaIndice += 1;
                                    $productosAgregados++;
                                }

                                 // $filaIndice += 1;
                            }

                            if ($productosAgregados > $filasParaAgregar) {
                                $filasParaAgregar = $productosAgregados;
                            }
                        }

                        $filaIndice += $filasParaAgregar;
                    }
                }

                // foreach($sheet->getRowDimensions() as $rd) { 
                //     $rd->setRowHeight(509); 
                // }

                return $sheet;
            },
        ];
    }
}
