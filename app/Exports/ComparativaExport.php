<?php

namespace App\Exports;

use App\Producto;
use App\Tarea;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithPreCalculateFormulas;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Excel;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

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
                'borderStyle' => Border::BORDER_HAIR,
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
        ]];

    public $celdaEstilos = [
        'fill' => [
            'fillType' => Fill::FILL_SOLID,
            'startColor' => ['rgb' => 'ffffff'],
        ],
        'borders' => [
            'allBorders' => [
                'borderStyle' => Border::BORDER_HAIR,
                'color' => ['rgb' => '000000'],
            ],
        ],
    ];

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
                }

                $filaIndice++;

                $comparaciones = json_decode($tarea->comparaciones);

                foreach ($comparaciones as $comparacionIndice => $comparacion) {
                    $columna_inicio = 1;
                    $filasPorComparacion = 1;

                    $coordenada = getCoordinate($columna_inicio, $filaIndice);
                    $sheet->setCellValue($coordenada, $comparacion->productName);
                    $columna_inicio++;

                    $filaInicioComparacion = $filaIndice;
                    $filasPorComparacion = 1;

                    foreach ($comparacion->rows as $filaIndiceIndice => $fila) {
                        // $filaIndice++;
                        $filasParaAgregar = 0;

                        foreach ($fila->columns as $columnaIndice => $columna) {
                            $productosAgregados = 0;

                            foreach ($columna as $productoIndice => $celdaProducto) {
                                $producto = Producto::find($celdaProducto->id);

                                if ($producto) {

                                    $filaProducto = $filaIndice + $productoIndice;

                                    $columna_inicio = 2 + ($columnaIndice * $producto_columnas);

                                    // Fondo
                                    $columnaColorInicial = getColumn($columna_inicio);
                                    $columnaColorFinal = getColumn($columna_inicio + $producto_columnas - 1);
                                    if (property_exists($celdaProducto, 'backgroundColor')) {
                                        $this->celdaEstilos["fill"]["startColor"]["rgb"] = $celdaProducto->backgroundColor;
                                    } else {
                                        $this->celdaEstilos["fill"]["startColor"]["rgb"] = "ffffff";
                                    }
                                    $sheet->getStyle($columnaColorInicial . $filaProducto . ":" . $columnaColorFinal . $filaProducto)
                                        ->applyFromArray($this->celdaEstilos);

                                    $coordenada = getCoordinate($columna_inicio, $filaProducto);
                                    $sheet->setCellValue($coordenada, $producto->product_name_supplier);

                                    // Ajustar el color
                                    $columnaColorInicial = getColumn($columna_inicio);
                                    $columnaColorFinal = getColumn($columna_inicio + $producto_columnas);
                                    // $sheet->getStyle("$columnaColorInicial" . "".":$columnaColorFinal" . "1")->applyFromArray($encabezadoEstilos);

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
                        $filasPorComparacion += $filasParaAgregar;
                    }

                    // Ajustar el color
                    $sheet->getStyle("A$filaInicioComparacion" . ":A" . ($filaInicioComparacion + $filasPorComparacion - 2))->applyFromArray($this->encabezadoEstilos);
                }

                // foreach($sheet->getRowDimensions() as $rd) {
                //     $rd->setRowHeight(509);
                // }

                // Congelar los headers antes de la celda B3
                $sheet->freezePane("B3");

                return $sheet;
            },
        ];
    }
}
