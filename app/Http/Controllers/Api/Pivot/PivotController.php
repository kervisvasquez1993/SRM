<?php

namespace App\Http\Controllers\Api\Pivot;

use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PivotTareaProveederResource;

class PivotController extends Controller
{
    public function index()
    {
        $pivot = PivotTareaProveederResource::collection(PivotTareaProveeder::where('iniciar_negociacion', 1)->get());
        return $pivot;
    }
}
