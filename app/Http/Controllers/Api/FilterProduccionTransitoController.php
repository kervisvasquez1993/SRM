<?php

namespace App\Http\Controllers\Api;



use App\FilterProduccionTransito;
use App\Http\Controllers\Controller;

class FilterProduccionTransitoController extends Controller
{
    public function index()
    {
      $proveedor = FilterProduccionTransito::WidtFilter(
              request()->input('proveedores', []),
              request()->input('users', []),
              request()->input('produccion_transito', []),
              request()->input('pivot_tarea_proveedor', []),
              request()->input('code_unit', [])
            )->get();   
      return response()->json($proveedor);
    }
}
