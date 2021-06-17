<?php

namespace App\Http\Controllers\Api\User;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class UserController extends ApiController
{
    public function index()
    {
        return $this->showAll(User::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'rol' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $producto = new User();
        $producto->name = $request->name;
        $producto->rol = $request->rol;
        $producto->email = $request->email;
        $producto->password = Hash::make($request->password);
        $producto->save();

        return $this->showOne($producto);
    }


    public function show(User $user)
    {
        return $this->showOne($user);
    }

    public function update(Request $request, User $user)
    {
    }


    public function destroy(User $user)
    {
    }
}
