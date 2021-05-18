<?php

namespace App\Http\Controllers\Api;



use App\FilterProduccionTransito;
use App\Http\Controllers\Controller;

class FilterProduccionTransitoController extends Controller
{
    public function index()
    {
      $proveedor = FilterProduccionTransito::WidtFilter(
              request()->input('proveedor', []),
              request()->input('user', []),
              request()->input('produccion_transito', []),
              request()->input('pivot_tarea_proveedor', [])
            )->get();   
      return response()->json($proveedor);
    }
}
