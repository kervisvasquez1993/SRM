<?php

namespace App\Http\Controllers\Api\Producto;

use Error;
use App\User;
use App\Tarea;
use App\Producto;
use App\Proveedor;
use ErrorException;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use Psy\Exception\Exception;
use App\Imports\ProductosImport;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use App\Notifications\GeneralNotification;
use Illuminate\Support\Facades\Notification;
use Carbon\Exceptions\BadMethodCallException;
use Symfony\Component\HttpFoundation\Response;

class ProductoController extends ApiController
{
    private $validation_rules = [
        'product_name_supplier' => 'required|unique',
    ];

    private function showError($validatior)
    {
        if ($validatior->fails()) {
            return response()->json($validatior->errors(), Response::HTTP_BAD_REQUEST);
        }
    }
    /* tet */

    public function index(Request $request)
    {
        $negociacion_id = $request->pivot_tarea_proveedor;
        $productos = Producto::where('pivot_tarea_proveeder_id', $negociacion_id)->get();
        return $this->showAll($productos);
    }

    public function store(Request $request, PivotTareaProveeder $pivot_tarea_proveedor)
    {
        $validator = Validator::make($request->all(), $this->validation_rules);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }
        $request->merge(["pivot_tarea_proveeder_id" => $pivot_tarea_proveedor->id]);
        $producto = Producto::create($request->all());

        return $this->showOne($producto);
    }

    public function show(Producto $producto)
    {
        return $this->showOne($producto);
    }

    public function update(Request $request, Producto $producto)
    {
        if (!(auth()->user()->rol == 'coordinador') && !(auth()->user()->rol == 'comprador')) {
            return $this->errorResponse('No Tiene permiso para realizar esta accion', Response::HTTP_FORBIDDEN);
        }

        $validator = Validator::make($request->all(), $this->validation_rules);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }
        $producto->update(
            $request->all()
        );
        $producto->save();
        return $this->showOne($producto);
    }

    public function delete(Producto $producto)
    {
        $producto->delete();
        return $this->showOne($producto);
    }

    public function importProduct(Request $request, PivotTareaProveeder $pivot_tarea_proveeder_id)
    {
        $archivo = $request->file('import');
        // $pivot_tarea_proveeder_id->productos()->delete();

        try {
            $excel = Excel::toArray(new ProductosImport($pivot_tarea_proveeder_id->id), $archivo);

            $productosAgregados = collect();

            foreach ($excel as $hoja) {
                foreach ($hoja as $row) {
                    $product = [
                        'pivot_tarea_proveeder_id' => $pivot_tarea_proveeder_id->id,
                        'hs_code' => $row[1],
                        'product_code_supplier' => $row[2],
                        'product_name_supplier' => $row[3],
                        'brand_customer' => $row[4],
                        'sub_brand_customer' => $row[5],
                        'product_name_customer' => $row[6],
                        'description' => $row[7],
                        'shelf_life' => $row[8],
                        'total_pcs' => $row[9],
                        'unit_price' => $row[10],
                        'total_usd' => $row[11],
                        'pcs_unit_packing' => $row[12],
                        'pcs_inner_box_paking' => $row[13],
                        'pcs_ctn_paking' => $row[14],
                        'ctn_packing_size_l' => $row[15],
                        'ctn_packing_size_w' => $row[16],
                        'ctn_packing_size_h' => $row[17],
                        'cbm' => $row[18],
                        'n_w_ctn' => $row[19],
                        'g_w_ctn' => $row[20],
                        'total_ctn' => $row[21],
                        'corregido_total_pcs' => $row[22],
                        'total_cbm' => $row[23],
                        'total_n_w' => $row[24],
                        'total_g_w' => $row[25],
                        'linea' => $row[26],
                        'categoria' => $row[27],
                        'sub_categoria' => $row[28],
                        'permiso_sanitario' => $row[29],
                        'cpe' => $row[30],
                        'num_referencia_empaque' => $row[31],
                        'codigo_de_barras_unit' => $row[32],
                        'codigo_de_barras_inner' => $row[33],
                        'codigo_de_barras_outer' => $row[34],
                        'codigo_interno_asignado' => $row[35],
                    ];

                    $validator = Validator::make($product, [
                        'product_name_supplier' => 'required'
                    ]);

                    $productosAgregados->add($product);

                    if (!$validator->fails()) {
                        $producto =  $pivot_tarea_proveeder_id->productos
                            ->where('product_name_supplier', $product['product_name_supplier'])
                            ->where('product_code_supplier', $product['product_code_supplier'])
                            ->first();

                        if ($producto) {
                            error_log("actualizado");
                            $producto->update($product);
                        } else {
                            error_log("creado");
                            Producto::create($product);
                        }
                    }
                }
            }

            $productos =  $pivot_tarea_proveeder_id->productos;

            foreach ($productos as $producto) {
                $coincidencia = $productosAgregados
                    ->where('product_name_supplier', $producto['product_name_supplier'])
                    ->where('product_code_supplier', $producto['product_code_supplier'])
                    ->first();

                if (!($coincidencia)) {
                    error_log("eliminado");
                    $producto->delete();
                }
            }
        } catch (\Exception $e) {
            return $this->errorResponse("Formato del Archivo no valido", 413);
        }

        /* notificacion */
        $login_user    = auth()->user()->name;
        $coordinador = User::find($pivot_tarea_proveeder_id->tarea->sender_id);
        $presidentes = User::where('isPresidente', true)->get();
        $comprador = $pivot_tarea_proveeder_id->tarea->usuario;
        $userAll = $presidentes->push($coordinador, $comprador)->unique('id');
        $proveedorName = Proveedor::findOrFail($pivot_tarea_proveeder_id->proveedor_id)->nombre;
        $tareaNombre   = Tarea::findOrFail($pivot_tarea_proveeder_id->tarea_id)->nombre;
        $text = "El usuario: '$login_user' cargo via excel informacion de producto a la empresa '$proveedorName' asociada a la tarea '$tareaNombre'";
        $link = "/negotiation/$pivot_tarea_proveeder_id->id#products";
        $type = "cargar_productos";
        /* Notification::send($userAll, new GeneralNotification($text, $link, $type)); */
        $title = "Importacion de Productos";
        $this->sendNotifications($userAll, new GeneralNotification($text, $link, $type, $title));
        return $this->successMensaje('Se Cargaron los Archivo de Forma Correcta', 201);
    }
}
