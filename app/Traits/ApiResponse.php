<?php

namespace App\Traits;

use App\User;
use Google\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;
use Illuminate\Database\Eloquent\Collection;
use Kreait\Firebase\Messaging\WebPushConfig;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

trait ApiResponse
{
    private function successResponse($data, $code)
    {
        return response()->json($data, $code);
    }
    protected function successMensaje($data, $code)
    {
        return response()->json(['data' => $data], $code);
    }
    protected function errorResponse($message, $code)
    {
        return response()->json(['error' => $message, 'code' => $code], $code);
    }

    protected function showAll(Collection $collection, $code = 200)
    {
        return $this->successResponse(['data' => $collection], $code);
    }
    protected function showAllResources(ResourceCollection $collection, $code = 200)
    {
        return $this->successResponse(['data' => $collection], $code);
    }
    protected function showOne(Model $instace, $code = 200)
    {
        return $this->successResponse(['data' => $instace], $code);
    }
    protected function showOneResource(JsonResource $instace, $code = 200)
    {
        return $this->successResponse(['data' => $instace], $code);
    }

    protected function sendNotifications($usuarios, $notificacion)
    {
        $messaging = app('firebase.messaging');

        $config = WebPushConfig::fromArray([
            'fcm_options' => [
                'link' => $notificacion->link,
            ],
        ]);

        $message = CloudMessage::new()
            ->withNotification(Notification::create($notificacion->title, $notificacion->text))->withWebPushConfig($config);

        $deviceTokens = $usuarios->whereNotNull('device_key')->pluck('device_key')->all();
        $messaging->sendMulticast($message, $deviceTokens);

        return;
    }
}
