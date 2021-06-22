<?php

namespace App\Http\Controllers\Api\Pivot;

use App\User;
use App\Tarea;
use App\Compra;
use App\Proveedor;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use App\Exports\ComprasExport;
use App\Imports\ComprasImport;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use App\Notifications\GeneralNotification;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpFoundation\Response;

class PivotCompraController extends ApiController
{
    private $validator_array = [
        'item' => 'required',
        'descripcion' => 'required',
        'registro_salud' => 'required',
        'cantidad_ctns' => 'required|numeric',
        'price' => 'required|numeric',
        'total' => 'required|numeric'
    ];

    public function index($negociacion_id)
    {
        $pivot = PivotTareaProveeder::findOrFail($negociacion_id);
        return $this->showAll($pivot->compras);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->validator_array);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $compra = new Compra();
        $compra->pivot_tarea_proveeder_id = $request->negociacion_id;
        $compra->item = $request->item;
        $compra->descripcion = $request->descripcion;
        $compra->registro_salud = $request->registro_salud;
        $compra->cantidad_ctns = $request->cantidad_ctns;
        $compra->price = $request->price;
        $compra->total = $request->total;
        $compra->comprador = auth()->user()->email;
        $compra->save();

        return $this->showOne($compra);
    }

    public function importCompra(Request $request, PivotTareaProveeder $negociacion)
    {

        $archivo = $request->file('import_compra');
        $id_pivot =  $negociacion->id;
        Excel::import(new ComprasImport($id_pivot), $archivo);
        $login_user    = auth()->user()->name;
        $coordinaodres = User::where('rol', 'coordinador')->get();
        $proveedorName = Proveedor::findOrFail($negociacion->proveedor_id)->nombre;
        $tareaNombre   = Tarea::findOrFail($negociacion->tarea_id)->nombre;
        $text = "El usuario: '$login_user' cargo via excel informacion de orden de compra a la empresa '$proveedorName' asociada a la tarea '$tareaNombre'";
        $link = "/negotiation/$negociacion->id#purchases";
        $type = "cargar_productos";
        Notification::send($coordinaodres, new GeneralNotification($text, $link, $type));
        return $this->successMensaje('Archivo de Ordenes de Compra Importado Correctamente', 201);
    }

    public function exportCompra(PivotTareaProveeder $negociacion)
    {


        return Excel::download(new ComprasExport($negociacion->id), 'ordenDeCompra.xlsx');
    }

    public function show($compra_id)
    {
        $compra =  PivotTareaProveeder::findOrFail($compra_id);
        return $this->showOne($compra);
    }


    public function update(Request $request, $compra_id)
    {
        $validator = Validator::make($request->all(), $this->validator_array);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $compra = Compra::findOrFail($compra_id);
        $compra->update($request->all());
        $compra->save();

        return $this->showOne($compra);
    }

    public function destroy($compra_id)
    {
        $compra = Compra::findOrFail($compra_id);
        $compra->delete();

        return $this->showOne($compra);
    }
}
