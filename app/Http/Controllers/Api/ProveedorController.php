<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Http\Resources\ProveedorResource;
use App\Proveedor;
use Illuminate\Http\Request;

class ProveedorController extends Controller
{
    public function index()
    {
      $proveedor = Proveedor::withCount(['filter'=> function($query){
            $query->WidtFilter(
              request()->input('proveedores', []),
              request()->input('users', []),
              request()->input('produccion_transito', []),
              request()->input('pivot_tarea_proveedor', []),
              request()->input('code_unit', [])
            );
      }])->get();
      
      return ProveedorResource::collection($proveedor);
    }
}
