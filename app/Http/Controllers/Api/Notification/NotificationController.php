<?php

namespace App\Http\Controllers\Api\Notification;

use auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Resources\NotificationResource;
use Illuminate\Notifications\DatabaseNotification;

class NotificationController extends ApiController
{
    public function index()
    {
        $user = auth()->user();
        $notificaciones = $user->notifications;
        return $notificaciones;
        $notificaciones = NotificationResource::collection($notificaciones);
        return $this->showAllResources($notificaciones);

    }

    public function read($id)
    {
        DatabaseNotification::find($id)->markAsRead();
        return $this->successMensaje('Notificacion Marcada como leida', 201);
        
    }
}
