<?php

namespace App\Http\Controllers\Api;


use App\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Session;

class UserController extends ApiController
{
    
      
  public function register(Request $request) 
  {

   

      $data = $request->validate([
          'name' => 'required|min:4',
          'email' => 'required|email|max:255|unique:users',
          'password' => 'required|min:8',
          'rol' => ['required',  Rule::in(['coordinador', 'comprador', 'artes']) ]
      ]);
      
      $user = new User();
      $user->name = $data['name'];
      $user->email = $data['email'];
      $user->password = Hash::make($data['password']);
      $user->rol = $data['rol'];
      $user->save();
      return $this->successMensaje('Usuarios Creado correctamente', 201);
  }
}
