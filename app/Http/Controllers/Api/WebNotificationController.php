<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\FcmToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\ApiController;
use Symfony\Component\HttpFoundation\Response;

class WebNotificationController extends ApiController
{
    public function storeToken(Request $request)
    {
        $request->validate([
            'value' => 'required',
            'device_id' => 'required'
        ]);

        $deviceId = $request->device_id;
        $usuario = auth()->user();

        $token = $usuario->fcmTokens()->where('device_id', $deviceId)->first();
        // Si el token ya existe se debe actualizar
        if ($token) {
            $token->delete();
        }

        // Si el token no existe, se crea uno nuevo
        $token = new FcmToken();
        $token->value = $request->value;
        $token->user_id = $usuario->id;
        $token->device_id = $deviceId;
        $token->save();

        return $token;
        //auth()->user()->update(['device_key' => $request->token]);
        //return response()->json(['Token successfully stored.']);
    }

    public function deleteToken(Request $request, FcmToken $fcmToken)
    {
        $fcmToken->delete();

        return $fcmToken;
        /*
        $usuario = auth()->user();
        $request->validate([
            'device_id' => 'required'
        ]);

        $token = $usuario->fcmTokens()->where('device_id', $request->device_id)->first();
        if ($token) {
            $token->delete();
        }

        return response()->json(['Token successfully removed.']);*/
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
