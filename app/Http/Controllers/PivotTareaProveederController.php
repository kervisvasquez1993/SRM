<?php

namespace App\Http\Controllers;

use App\PivotTareaProveeder;
use Illuminate\Http\Request;

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
       
        $pivot = PivotTareaProveeder::where('id', $id)->update(array('iniciar_arte' => 1));
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
