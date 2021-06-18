<?php

namespace App\Http\Controllers\Api\Pivot;

use App\Compra;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use App\Exports\ComprasExport;
use App\Imports\ComprasImport;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class PivotCompraController extends ApiController
{
    private $validator_array = [
        'orden_compra' => 'required',
        'item' => 'required',
        'descripcion' => 'required',
        'registro_salud' => 'required',
        'cantidad_pcs' => 'required|numeric',
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

        if ($validator->fails())
        {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $compra = new Compra();
        $compra->orden_compra = $request->orden_compra;
        $compra->pivot_tarea_proveeder_id = $request->negociacion_id;
        $compra->item = $request->item;
        $compra->descripcion = $request->descripcion;
        $compra->registro_salud = $request->registro_salud;
        $compra->cantidad_pcs = $request->cantidad_pcs;
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

        if ($validator->fails())
        {
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
