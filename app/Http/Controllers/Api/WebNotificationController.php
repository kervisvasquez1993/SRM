<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\ApiController;
use Symfony\Component\HttpFoundation\Response;

class WebNotificationController extends ApiController
{
    public function storeToken(Request $request)
    {
        auth()->user()->update(['device_key' => $request->token]);
        return response()->json(['Token successfully stored.']);
    }

    public function deleteToken(Request $request)
    {
        $user = auth()->user();

        $user->device_key = null;
        $user->save();

        return response()->json(['Token successfully removed.']);
    }

    public static function deleteTokenByName($token)
    {
        $usuario = User::where('device_key', $token)->first();
        if ($usuario) {
            $usuario->device_key = null;
            $usuario->save();

            error_log($usuario->name);

            error_log("Deleting token: $token");
        }
    }
}
