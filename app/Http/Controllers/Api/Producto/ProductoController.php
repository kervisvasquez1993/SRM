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
use App\Exports\ProductosExport;
use App\Imports\ProductosImport;
use Google\Service\Vault\Export;
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
        'product_name_supplier' => 'required',
        'product_code_supplier' => 'required',
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
        $this->mensaje_notificacion($producto, "CREO el producto: $producto->product_name_supplier");
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

        $this->mensaje_notificacion($producto, "Actualizo el producto: $producto->product_name_supplier");

        return $this->showOne($producto);
    }

    public function delete(Producto $producto)
    {
        $producto->delete();
        $this->mensaje_notificacion($producto, "ELIMINO el producto: $producto->product_name_supplier");
        return $this->showOne($producto);
    }
    public function mensaje_notificacion($producto, $accion)
    {

        $pivot = $producto->pivot;

        if($pivot->productos_confirmados == true && $pivot->seleccionado == true)
        {
            /* usuarios */
            $login_user    = auth()->user()->name;
            $coordinador = User::find($pivot->tarea->sender_id);
            $presidentes = User::where('isPresidente', true)->get();
            $comprador = $pivot->tarea->usuario;
            $logistica = User::where('rol', 'logistica')->get();
            /* fin de usuarios */
            /* Nombres tarea proveedor */
            $proveedorName = Proveedor::findOrFail($pivot->proveedor_id)->nombre;
            $tareaNombre   = Tarea::findOrFail($pivot->tarea_id)->nombre;
            /* fin  */
            
            $userAll = $presidentes->push($coordinador, $comprador)->merge($logistica)->unique('id');
            /* $user_with_logistica = $userAll->merge($logistica)->unique('id'); */
            
            /* mensaje */
            
            $text = "El usuario: '$login_user' $accion, perteneciente a la empresa '$proveedorName' que está asociada a la tarea '$tareaNombre'";
            $link = "/negotiation/$pivot->id#products";
            $type =  "codigos_barra";
            $title = "Codigos de barra";
            $this->sendNotifications($userAll, new GeneralNotification($text, $link, $type, $title));


            /* fin mensaje */
        }

       
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
                        /* formulas */
                        $total_ctn =  ($row[9] == null && $row[14] == null) ? 0 : $row[9] / $row[14],
                        $total_cbm =  $row[18] * $total_ctn,
                        $total_v_w = $total_ctn * $row[19],
                        $total_g_w = $total_ctn * $row[20],
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
                        'total_ctn' => $total_ctn,
                        'corregido_total_pcs' => $row[22],
                        'total_cbm' => $total_cbm,
                        'total_n_w' => $total_v_w,
                        'total_g_w' => $total_g_w,
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
                        'product_name_supplier' => 'required',
                        'product_code_supplier' => 'required'
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

        return $this->successMensaje('Se Cargaron los Archivo de Forma Correcta', 201);
    }


    public function exportProduct($producto)
    {
        return Excel::download(new ProductosExport($producto), 'plantilla.xlsx');
    }
}
