<?php

namespace App\Http\Controllers\Api\Pivot;

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
        $pivotResource = new PivotTareaProveederResource($pivot);
        return $this->showOneResource($pivotResource);
        
    }

    public function startProduccion($pivotTareaProveederId)
    {
        $pivot = PivotTareaProveeder::findOrFail($pivotTareaProveederId);
        $pivot->iniciar_produccion = 1;
        $pivot->save();
        $pivotResource = new PivotTareaProveederResource($pivot);
        return $this->showOneResource($pivotResource);
        
    }
}
