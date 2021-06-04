<?php

namespace App\Http\Controllers\Api\Pivot;

use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Resources\PivotTareaProveederResource;

class PivotController extends Controller
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
        return $resultado;

        
        
        
    }
}
