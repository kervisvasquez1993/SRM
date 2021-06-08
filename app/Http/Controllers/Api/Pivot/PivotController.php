<?php

namespace App\Http\Controllers\Api\Pivot;

use App\Arte;
use Carbon\Carbon;
use App\ProduccionTransito;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ApiController;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Resources\PivotTareaProveederResource;

class PivotController extends ApiController
{
    public function index()
    {
        $pivotPrincipal = PivotTareaProveeder::where('iniciar_negociacion', 1);
        if(!(auth()->user()->rol == 'coordinador' || Auth::user()->rol == 'observador'))
        {
            $pivotPrincipal = $pivotPrincipal->whereHas('tarea', function(Builder $query){
                $query->where('user_id', auth()->user()->id);
            });
        }
        $resultado = PivotTareaProveederResource::collection($pivotPrincipal->get());
        return $this->showAllResources($resultado);        
    }

    public function show($pivot_id)
    {
        $pivot =  new PivotTareaProveederResource(PivotTareaProveeder::findOrFail($pivot_id));
        return  $this->showOneResource($pivot);
    }

    public function startArte($pivotTareaProveederId)
    {
        $pivot = PivotTareaProveeder::findOrFail($pivotTareaProveederId);
        $pivot->iniciar_arte = 1;
        $pivot->save();
        $this->artesCreate($pivot->id, $pivot->compra->item); 
        $pivotResource = new PivotTareaProveederResource($pivot);
        
        return $this->showOneResource($pivotResource);
        
    }

    public function startProduccion($pivotTareaProveederId)
    {
        $pivot = PivotTareaProveeder::findOrFail($pivotTareaProveederId);
        $pivot->iniciar_produccion = 1;
        $pivot->save();
        $this->produccionTransitoCreate($pivot->id);
        $pivotResource = new PivotTareaProveederResource($pivot);
        
        return $this->showOneResource($pivotResource);
    }

    public function artesCreate($id,$item)
    {
        $artesCreate = Arte::where('pivot_tarea_proveeder_id', $id)->first();
        if($artesCreate)
        {
            return $this->successMensaje('Ya se Inicializo El Arte con este Proveedor', 201);
        }
        $arte = new Arte();
        $arte->pivot_tarea_proveeder_id = $id;
        $arte->nombre = $item;
        $arte->creacion_fichas = 1;
        $arte->validacion_fichas = 1;
        $arte->creacion_boceto =  1;
        $arte->validacion_boceto = 1;
        $arte->confirmacion_proveedor = 1;
        $arte->fecha_fin = Carbon::now(); /* //TODO cambiar el metodo de carbon por fecha de finalizacion recibida de request */
        $arte->save();
    }

    public function produccionTransitoCreate($id)
    {
        $producionTransito = ProduccionTransito::where('pivot_tarea_proveeder_id', $id)->first();
        if($producionTransito)
        {
            return $this->successMensaje('Ya se Inicializo la produccion con este Proveedor', 201);
        }
           $produccionAprobar = new ProduccionTransito();
           $produccionAprobar->pivot_tarea_proveeder_id = $id;
           $produccionAprobar->save();
        
    }
}
