<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Proveedor;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
      $users = User::withCount(['filter'=> function($query){
            $query->WidtFilter(
              request()->input('proveedor', []),
              request()->input('user', []),
              request()->input('produccion_transito', []),
              request()->input('pivot_tarea_proveedor', [])
            );
      }])->get();
      
      return response()->json($users);
      
    }
}
