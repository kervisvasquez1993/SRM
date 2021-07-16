<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use App\Archivado;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ApiController;
use App\Http\Resources\ReclamoDevolucionResource;

class ReclamoDevolucionController extends ApiController
{

    public function index()
    {

        // if (Auth::user()->rol == "coordinador" || Auth::user()->rol == "almacen") {
        //     $rrd = RecepcionReclamoDevolucion::all();
        // } else {
        //     $rrd = Auth::user()->tareas()
        //         ->with('pivotTareaProveedor.produccionTransito.recepcionReclamoDevolucion')
        //         ->get()
        //         ->pluck('pivotTareaProveedor')
        //         ->collapse()
        //         ->pluck('produccionTransito')
        //         ->pluck('recepcionReclamoDevolucion');
        // }
        $rrd = RecepcionReclamoDevolucion::all();
        return $this->showAllResources(ReclamoDevolucionResource::collection($rrd));
    }


    public function show(RecepcionReclamoDevolucion $reclamos_devolucion)
    {
        return $this->showOneResource(new ReclamoDevolucionResource($reclamos_devolucion));
    }

    public function update(Request $request, RecepcionReclamoDevolucion $reclamos_devolucione)
    {

        $reclamos_devolucione->update($request->all());
        if ($reclamos_devolucione->reclamos_devoluciones == 1) {
            $pivot_id = $reclamos_devolucione->ProduccionTransito->pivotTable->id;
            $existente = Archivado::where('pivot_tarea_proveeder_id', $pivot_id)->first();
            if (!$existente) {
                $archivado = new Archivado();
                $archivado->pivot_tarea_proveeder_id = $pivot_id;
                $archivado->save();
            }
        }
        return $this->showOneResource(new ReclamoDevolucionResource($reclamos_devolucione));
    }

    public function destroy($id)
    {
    }
}
