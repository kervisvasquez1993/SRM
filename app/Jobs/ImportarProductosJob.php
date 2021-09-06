<?php

namespace App\Jobs;

use App\Imports\ProductosImport;
use App\Producto;
use Error;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;
use Maatwebsite\Excel\Facades\Excel;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;

class ImportarProductosJob extends ImportarArchivoJob
{
    protected function procesar($archivo, $usuario, $modelo)
    {
        try {
            $excel = Excel::toArray(new ProductosImport, $archivo);
            $productosAgregados = collect();

            foreach ($excel as $hoja) {
                $contador = 4;
                foreach ($hoja as $row) {
                    try {
                        if ($usuario->rol == 'logistica') {
                            $product = [
                                'product_name_customer' => $row[7],
                                'num_referencia_empaque' => $row[33],
                                'u_m_unit' => $row[34],
                                'codigo_de_barras_unit' => $row[35],
                                'u_m_inner_1' => $row[36],
                                'codigo_de_barras_inner_1' => $row[37],
                                'u_m_inner_2' => $row[38],
                                'codigo_barra_inner_2' => $row[39],
                                'u_m_outer' => $row[40],
                                'codigo_de_barras_outer' => $row[41],
                                'codigo_interno_asignado' => $row[42],
                                'descripcion_asignada_sistema' => $row[43],
                            ];

                            $producto = $modelo
                                ->productos()
                                ->where('product_name_supplier', $row[3])
                                ->where('product_code_supplier', $row[2])
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
                                'hs_code' => $row[1],
                                'product_code_supplier' => $row[2],
                                'product_name_supplier' => $row[3],
                                'brand_customer' => $row[4],
                                'sub_brand_customer' => $row[5],
                                'product_name_customer' => $row[6],
                                'description' => $row[7],
                                'shelf_life' => $row[9],
                                'total_pcs' => $row[10],
                                'unit_price' => $row[11],
                                'total_usd' => $row[12],
                                'pcs_unit_packing' => $row[13],
                                'pcs_inner1_box_paking' => $row[14],
                                'pcs_inner2_box_paking' => $row[15],
                                'pcs_ctn_paking' => $row[16],
                                'ctn_packing_size_l' => $row[17],
                                'ctn_packing_size_w' => $row[18],
                                'ctn_packing_size_h' => $row[19],
                                'cbm' => $row[20],
                                'n_w_ctn' => $row[21],
                                'g_w_ctn' => $row[22],
                                'total_ctn' => $row[23],
                                'corregido_total_pcs' => $row[24],
                                'total_cbm' => $row[25],
                                'total_n_w' => $row[26],
                                'total_g_w' => $row[27],
                                'linea' => $row[28],
                                'categoria' => $row[29],
                                'sub_categoria' => $row[30],
                                'permiso_sanitario' => $row[31],
                                'cpe' => $row[32],
                                'num_referencia_empaque' => $row[33],
                            ];

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

                    $contador++;
                }
            }

            // Cargar imagenes
            $idProductosConImagenes = collect();
            $excel = IOFactory::load($archivo);
            $sheet = $excel->getActiveSheet();
            $drawings = $sheet->getDrawingCollection();

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
                        error_log("Subiendo imagen $producto->imagen");
                        Storage::disk('s3')->put($file_name, $imagen->stream()->__toString(), 'public');
                        $producto->imagen = $file_name;
                        $producto->save();

                        $idProductosConImagenes->add($producto->id);
                    }
                }
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

        $producto->pivot->actualizarFechaEdicionProductos();
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
