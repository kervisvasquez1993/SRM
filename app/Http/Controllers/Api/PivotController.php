<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\PivotTareaProveeder;

class PivotController extends Controller
{
    public function index()
    {
      $proveedor = PivotTareaProveeder::with(['filter'=> function($query)
      {
              $query->WidtFilter(
              request()->input('proveedor', []),
              request()->input('user', []),
              request()->input('produccion_transito', []),
              request()->input('pivot_tarea_proveedor', [])
            );
      }])->get();   
      return response()->json($proveedor);
    }
}
