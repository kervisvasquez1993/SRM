<?php

namespace App\Http\Controllers\Api\Producto;

use App\User;
use App\Tarea;
use App\Producto;
use App\Proveedor;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use App\Imports\ProductosImport;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use App\Notifications\GeneralNotification;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpFoundation\Response;

class ProductoController extends ApiController
{
    private $validation_rules = [
        'hs_code' => 'required',
        'product_code' => 'required',
        'description' => 'required',
        'original_product_name' => 'required',
        'brand' => 'required',
        'product_name' => 'required',
        'total_pcs' => 'required|numeric',
        'shelf_life' => 'required|numeric',
        'total_pcs' => 'required|numeric',
        'pcs_unit' => 'required|numeric',
        'pcs_inner_box' => 'required|numeric',
        'pcs_ctn' => 'required|numeric',
        'ctn_packing_size_l' => 'required|numeric',
        'ctn_packing_size_w' => 'required|numeric',
        'ctn_packing_size_h' => 'required|numeric',
        'cbm' => 'required|numeric',
        'n_w_ctn' => 'required|numeric',
        'g_w_ctn' => 'required|numeric',
        'total_ctn' => 'required|numeric',
        'corregido_total_pcs' => 'required|numeric',
        'total_cbm' => 'required|numeric',
        'total_n_w' => 'required|numeric',
        'total_g_w' => 'required|numeric',
    ];

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


    public function update(Request $request, Producto $producto)
    {
        if (!(auth()->user()->rol == 'coordinador') && !(auth()->user()->rol == 'comprador')) {
            return $this->errorResponse('No Tiene permiso para realizar esta accion', Response::HTTP_FORBIDDEN);
        }

        $validator = Validator::make($request->all(), $this->validation_rules);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }
        $producto->update($request->all());
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
        $pivot_tarea_proveeder_id->productos()->delete();
        Excel::import(new ProductosImport($pivot_tarea_proveeder_id->id), $archivo);
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
