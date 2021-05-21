<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\ProduccionTransito;
use Illuminate\Http\Request;

class ProduccionTransitoController extends Controller
{
    public function index()
    {
      $proveedor = ProduccionTransito::with(['filter'=> function($query)
      {
              $query->WidtFilter(
              request()->input('proveedor', []),
              request()->input('user', []),
              request()->input('produccion_transito', []),
              request()->input('pivot_tarea_proveedor', []),
              request()->input('code_unit', [])
            );
      }])->get();
      
      return response()->json($proveedor);
    }
}
