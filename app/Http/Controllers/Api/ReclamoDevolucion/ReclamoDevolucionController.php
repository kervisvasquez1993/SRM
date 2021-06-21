<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;

class ReclamoDevolucionController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reclamos = RecepcionReclamoDevolucion::all();
        return $this->showAll($reclamos);
    }

    
    public function show( RecepcionReclamoDevolucion $reclamos_devolucione)
    {
        return $this->showOne($reclamos_devolucione);
    }

    public function update(Request $request, RecepcionReclamoDevolucion $reclamos_devolucione)
    {
        return $this->showOne($reclamos_devolucione);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
