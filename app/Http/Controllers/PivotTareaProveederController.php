<?php

namespace App\Http\Controllers;

use App\Arte;
use App\PivotTareaProveeder;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Relations\Pivot;

class PivotTareaProveederController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function arteAprobado($id)
     {
         $pivot = PivotTareaProveeder::findOrFail($id);
         $pivot->iniciar_arte = 1;
         $pivot->save();
         $arte = new Arte();
         $arte->pivot_tarea_proveeder_id = $pivot->id;
         $arte->nombre = 'sin definir';
         $arte->creacion_fichas = 1;
         $arte->validacion_fichas = 1;
         $arte->creacion_boceto =  1;
         $arte->validacion_boceto = 1;
         $arte->confirmacion_proveedor = 1;
         $arte->fecha_fin = Carbon::now(); /* //TODO cambiar el metodo de carbon por fecha de finalizacion recibida de request */
         $arte->save();
        return  "arte creado";
     }


     public function produccionAprobado($id)
     {
        $pivot = PivotTareaProveeder::where('id', $id)->update(array('iniciar_produccion' => 1));
        return  $pivot;
     }

     public function arteProduccionAprobado($id)
     {
        $pivot = PivotTareaProveeder::where('id', $id)->update(
            array(
            'iniciar_produccion' => 1,
            'iniciar_arte' => 1
        ));
        return  $pivot;
     }



    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PivotTareaProveeder  $pivotTareaProveeder
     * @return \Illuminate\Http\Response
     */
    public function show(PivotTareaProveeder $pivotTareaProveeder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PivotTareaProveeder  $pivotTareaProveeder
     * @return \Illuminate\Http\Response
     */
    public function edit(PivotTareaProveeder $pivotTareaProveeder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PivotTareaProveeder  $pivotTareaProveeder
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PivotTareaProveeder $pivotTareaProveeder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PivotTareaProveeder  $pivotTareaProveeder
     * @return \Illuminate\Http\Response
     */
    public function destroy(PivotTareaProveeder $pivotTareaProveeder)
    {
        //
    }
}
