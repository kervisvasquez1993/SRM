<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\ApiController;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class UserController extends ApiController
{
    public function __construct()
    {
        $this->middleware('coordinador', ['except' => ['update', 'index']]);
    }

    public function index()
    {
        return $this->showAll(User::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'rol' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $usuario = new User();
        $usuario->name = $request->name;
        $usuario->rol = $request->rol;
        $usuario->email = $request->email;
        $usuario->password = Hash::make($request->password);
        $usuario->save();

        return $this->showOne($usuario);
    }

    public function show(User $user)
    {
        return $this->showOne($user);
    }

    public function update(Request $request, User $user)
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

        // Verificar si un usuario ya tiene el mismo email
        $repetido = User::where('email', $request->email)->where('email', '!=', $user->email)->first();
        if ($repetido) {
            return response()->json(['email' => ["El email ya está en uso"]], Response::HTTP_BAD_REQUEST);
            //return $this->errorResponse("El email ya está en uso", Response::HTTP_BAD_REQUEST);
        }

        // Crear el hash de la contraseña nueva
        $request->merge([
            'password' => Hash::make($request->password),
        ]);

        $user->update($request->all());

        return $this->showOne($user);
    }

    public function destroy(User $user)
    {
    }
}
