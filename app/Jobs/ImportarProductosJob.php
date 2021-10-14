<?php

namespace App\Jobs;

use App\Producto;
use Error;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;

class ImportarProductosJob extends ImportarArchivoJob
{
    protected function procesar($archivo, $usuario, $modelo)
    {
        $ram = memory_get_usage(true) / 1000;
        error_log("Memoria ram inicial: $ram");

        try {
            // $excel = Excel::toArray(new ProductosImport, $archivo);
            $excel = IOFactory::load($archivo);
            $sheet = $excel->getActiveSheet();
            $productosAgregados = collect();

            // Imprimir ram
            $ram = memory_get_usage(true) / 1000;
            error_log("RAM luego de cargar excel: $ram");

            $offset = 3;
            $cantidadFilas = $sheet->getHighestRow();
            $totalProductos = $cantidadFilas - $offset;

            error_log("Se cargaran $totalProductos productos");

            $productosProcesados = 0;

            $contador = 4;
            for ($i = 4; $i < $cantidadFilas; $i++) {
                try {
                    if ($usuario->rol == 'logistica') {
                        $product = [
                            'product_name_customer' => $sheet->getCellByColumnAndRow(8, $i)->getCalculatedValue(),
                            'num_referencia_empaque' => $sheet->getCellByColumnAndRow(34, $i)->getCalculatedValue(),
                            'u_m_unit' => $sheet->getCellByColumnAndRow(35, $i)->getCalculatedValue(),
                            'codigo_de_barras_unit' => $sheet->getCellByColumnAndRow(36, $i)->getCalculatedValue(),
                            'u_m_inner_1' => $sheet->getCellByColumnAndRow(37, $i)->getCalculatedValue(),
                            'codigo_de_barras_inner_1' => $sheet->getCellByColumnAndRow(38, $i)->getCalculatedValue(),
                            'u_m_inner_2' => $sheet->getCellByColumnAndRow(39, $i)->getCalculatedValue(),
                            'codigo_barra_inner_2' => $sheet->getCellByColumnAndRow(40, $i)->getCalculatedValue(),
                            'u_m_outer' => $sheet->getCellByColumnAndRow(41, $i)->getCalculatedValue(),
                            'codigo_de_barras_outer' => $sheet->getCellByColumnAndRow(42, $i)->getCalculatedValue(),
                            'codigo_interno_asignado' => $sheet->getCellByColumnAndRow(43, $i)->getCalculatedValue(),
                            'descripcion_asignada_sistema' => $sheet->getCellByColumnAndRow(44, $i)->getCalculatedValue(),
                        ];

                        $producto = $modelo
                            ->productos()
                            ->where('product_name_supplier', $sheet->getCellByColumnAndRow(4, $i)->getCalculatedValue())
                            ->where('product_code_supplier', $sheet->getCellByColumnAndRow(3, $i)->getCalculatedValue())
                            ->first();

                        if ($producto) {
                            $producto->update($product);
                        }
                    } else {
                        // try {

                        //     $total_ctn = $row[10] / $row[15];
                        // } catch (\Throwable$th) {
                        //     $total_ctn = 0;
                        // }

                        $product = [
                            'pivot_tarea_proveeder_id' => $modelo->id,
                            'hs_code' => $sheet->getCellByColumnAndRow(2, $i)->getCalculatedValue(),
                            'product_code_supplier' => $sheet->getCellByColumnAndRow(3, $i)->getCalculatedValue(),
                            'product_name_supplier' => $sheet->getCellByColumnAndRow(4, $i)->getCalculatedValue(),
                            'hs_code' => $sheet->getCellByColumnAndRow(2, $i)->getCalculatedValue(),
                            'product_code_supplier' => $sheet->getCellByColumnAndRow(3, $i)->getCalculatedValue(),
                            'product_name_supplier' => $sheet->getCellByColumnAndRow(4, $i)->getCalculatedValue(),
                            'brand_customer' => $sheet->getCellByColumnAndRow(5, $i)->getCalculatedValue(),
                            'sub_brand_customer' => $sheet->getCellByColumnAndRow(6, $i)->getCalculatedValue(),
                            'product_name_customer' => $sheet->getCellByColumnAndRow(7, $i)->getCalculatedValue(),
                            'description' => $sheet->getCellByColumnAndRow(8, $i)->getCalculatedValue(),
                            'shelf_life' => $sheet->getCellByColumnAndRow(10, $i)->getCalculatedValue(),
                            'total_pcs' => $sheet->getCellByColumnAndRow(11, $i)->getCalculatedValue(),
                            'unit_price' => $sheet->getCellByColumnAndRow(12, $i)->getCalculatedValue(),
                            'total_usd' => $sheet->getCellByColumnAndRow(13, $i)->getCalculatedValue(),
                            'pcs_unit_packing' => $sheet->getCellByColumnAndRow(14, $i)->getCalculatedValue(),
                            'pcs_inner1_box_paking' => $sheet->getCellByColumnAndRow(15, $i)->getCalculatedValue(),
                            'pcs_inner2_box_paking' => $sheet->getCellByColumnAndRow(16, $i)->getCalculatedValue(),
                            'pcs_ctn_paking' => $sheet->getCellByColumnAndRow(17, $i)->getCalculatedValue(),
                            'ctn_packing_size_l' => $sheet->getCellByColumnAndRow(18, $i)->getCalculatedValue(),
                            'ctn_packing_size_w' => $sheet->getCellByColumnAndRow(19, $i)->getCalculatedValue(),
                            'ctn_packing_size_h' => $sheet->getCellByColumnAndRow(20, $i)->getCalculatedValue(),
                            'cbm' => $sheet->getCellByColumnAndRow(21, $i)->getCalculatedValue(),
                            'n_w_ctn' => $sheet->getCellByColumnAndRow(22, $i)->getCalculatedValue(),
                            'g_w_ctn' => $sheet->getCellByColumnAndRow(23, $i)->getCalculatedValue(),
                            'total_ctn' => $sheet->getCellByColumnAndRow(24, $i)->getCalculatedValue(),
                            'corregido_total_pcs' => $sheet->getCellByColumnAndRow(25, $i)->getCalculatedValue(),
                            'total_cbm' => $sheet->getCellByColumnAndRow(26, $i)->getCalculatedValue(),
                            'total_n_w' => $sheet->getCellByColumnAndRow(27, $i)->getCalculatedValue(),
                            'total_g_w' => $sheet->getCellByColumnAndRow(28, $i)->getCalculatedValue(),
                            'linea' => $sheet->getCellByColumnAndRow(29, $i)->getCalculatedValue(),
                            'categoria' => $sheet->getCellByColumnAndRow(30, $i)->getCalculatedValue(),
                            'sub_categoria' => $sheet->getCellByColumnAndRow(31, $i)->getCalculatedValue(),
                            'permiso_sanitario' => $sheet->getCellByColumnAndRow(32, $i)->getCalculatedValue(),
                            'cpe' => $sheet->getCellByColumnAndRow(33, $i)->getCalculatedValue(),
                            'num_referencia_empaque' => $sheet->getCellByColumnAndRow(34, $i)->getCalculatedValue(),
                        ];

                        // if ($i < 10) {
                        //     error_log($product["pivot_tarea_proveeder_id"]);
                        //     error_log($product["hs_code"]);
                        //     error_log($product["product_code_supplier"]);
                        //     error_log($product["product_name_supplier"]);
                        // }

                        $validator = Validator::make($product, [
                            'product_name_supplier' => 'required',
                            'product_code_supplier' => 'required',
                        ]);

                        $productosAgregados->add($product);

                        // Si se pasa la validación entonces se determinara si se editara un producto y si
                        // se creara uno nuevo
                        if (!$validator->fails()) {
                            $producto = $modelo
                                ->productos()
                                ->where('product_name_supplier', $product['product_name_supplier'])
                                ->where('product_code_supplier', $product['product_code_supplier'])
                                ->first();

                            if ($producto) {
                                $producto->update($product);
                            } else {
                                Producto::create($product);
                            }
                        }
                    }
                } catch (\Throwable$th) {
                    error_log($th);
                    throw new Error("Existe un error en la linea $contador del excel");
                    // TODO:AGREGAR UN TRY CATCH PARA CADA COLUMNA
                }

                // error_log(memory_get_usage(true));
                $contador++;
                $productosProcesados++;
                $this->informarProgreso($productosProcesados / $totalProductos);
            }

            $this->informarProgreso(0, true);

            // Cargar imagenes
            $drawings = $sheet->getDrawingCollection();
            $idProductosConImagenes = collect();

            $totalImagenes = count($drawings);
            $imagenesProcesadas = 0;

            error_log("Se cargaran $totalImagenes imagenes");

            // Recorrer todas las imagenes
            foreach ($drawings as $drawing) {
                //check if it is instance of drawing
                if ($drawing instanceof Drawing) {
                    // Obtener las coordenadas
                    $coordenada = $drawing->getCoordinates();
                    $coordenadas = Coordinate::indexesFromString($coordenada);

                    // Obtener el producto correspondiente
                    $productCode = $sheet->getCellByColumnAndRow(3, $coordenadas[1])->getValue();
                    $productName = $sheet->getCellByColumnAndRow(4, $coordenadas[1])->getValue();
                    $producto = $modelo->productos()
                        ->where('product_name_supplier', $productName)
                        ->where('product_code_supplier', $productCode)
                        ->first();

                    // Si existe el producto entonces se guardara la imagen
                    if ($producto) {
                        // Eliminar el archivo viejo
                        Storage::disk('s3')->delete($producto->imagen);

                        // Cambiar el tamaño del archivo y convertirlo en jpg
                        $imagen = file_get_contents($drawing->getPath());
                        $imagen = Image::make($imagen)
                            ->resize(200, 200, function ($constraint) {
                                $constraint->aspectRatio();
                            })
                            ->encode('jpg', 75);

                        // Crear nombre del archivo
                        $file_name = "productos/" . $producto->id . ".jpg";

                        // Almacenarlo
                        Storage::disk('s3')->put($file_name, $imagen->stream()->__toString(), 'public');
                        $producto->imagen = $file_name;
                        $producto->save();
                        error_log("Subiendo imagen $producto->imagen");

                        // Eliminar la imagen
                        $imagen->destroy();

                        $idProductosConImagenes->add($producto->id);
                    }
                }

                $imagenesProcesadas++;
                $this->informarProgreso($imagenesProcesadas / $totalImagenes);
            }

            // Eliminar los productos que no están en el excel subido
            if ($usuario->rol == 'comprador' || $usuario->rol == 'coordinador') {
                $productos = $modelo->productos;

                foreach ($productos as $producto) {
                    $coincidencia = $productosAgregados
                        ->where('product_name_supplier', $producto['product_name_supplier'])
                        ->where('product_code_supplier', $producto['product_code_supplier'])
                        ->first();

                    // Si el producto no está en los productos cargados, se aliminara
                    // de lo contrario se determinara si su imagen fue eliminada del excel
                    if (!$coincidencia) {
                        // Eliminar la imagen
                        if ($producto->imagen) {
                            Storage::disk('s3')->delete($producto->imagen);
                        }

                        $producto->delete();
                    } else {
                        if ($producto->imagen && !$idProductosConImagenes->contains($producto->id)) {
                            // Eliminar la imagen
                            Storage::disk('s3')->delete($producto->imagen);
                            $producto->imagen = null;
                            $producto->save();
                        }
                    }
                }
            }
        } catch (\Throwable$e) {
            error_log($e);
            throw new Error("El formato del archivo no es valido");
        }

        // Imprimir ram antes de eliminar el excel
        $ram = memory_get_usage(true) / 1000;
        error_log("Memoria ram final: $ram");

        // Liberar ram del excel
        $excel->disconnectWorksheets();
        $excel->garbageCollect();
        unset($excel);

        // Imprimir ram despues de eliminar el excel
        $ram = memory_get_usage(true) / 1000;
        error_log("Memoria ram final: $ram");

        // $producto->pivot->actualizarFechaEdicionProductos();
    }

    protected function ruta()
    {
        return "comparaciones/{$this->modelo->id}.xlsx";
    }

    protected function respuesta()
    {
        return ["negociacion_id" => $this->modelo->id];
    }
}
