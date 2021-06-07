<?php

namespace App\Http\Controllers\Api\Pivot;

use App\Compra;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class PivotCompraController extends ApiController
{
   
    
    public function store(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            
            'orden_compra' => 'required',
            'item' => 'required',
            'descripcion' => 'required',
            'registro_salud' => 'required',
            'cantidad_pcs' => 'required|numeric',
            'total' => 'required|numeric', 
            'comprador' => 'required',           
        ]);

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
        return $compra;
    }

 
    public function show($negociacione_id)
    {
        $pivot =  PivotTareaProveeder::findOrFail($negociacione_id);
        return $this->showOne($pivot->compra);
    }

  
    public function update(Request $request, $compra)
    {
        $compra = Compra::findOrFail($compra);
        $compra->update($request->all());
        $compra->save();
        return $this->showOne($compra);
    }

 
    public function destroy(PivotTareaProveeder $pivotTareaProveeder)
    {
        //
    }
}
