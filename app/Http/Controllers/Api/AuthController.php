<?php

namespace App\Http\Controllers\Api;

use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only("email", "password");
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }
        if (!$token = JWTAuth::attempt([
            'email' => $request->email,
            'password' => $request->password]))
        {
            return response()->json(['error' => 'Los Datos Suministrado son incorrectos,'], 401);
        }
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 120
        ]);
    }

    public function logout()
    {
        JWTAuth::invalidate();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'access_token' => JWTAuth::refresh(),
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 120
        ]);
    }

    public function me()
    {
        return response()->json(
            JWTAuth::user()
        );
    }
}
