<?php

namespace App\Http\Controllers\Api\Notification;

use App\Http\Controllers\ApiController;
use App\Http\Resources\NotificationResource;
use auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

class NotificationController extends ApiController
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $notificaciones = $user->notifications;
        $notificaciones = NotificationResource::collection($notificaciones);
        return $this->showAllResourcesPaginate($notificaciones);
    }

    public function marcarComoLeidas(Request $request)
    {
        $user = auth()->user();
        $notificaciones = $user->notifications;

        foreach ($notificaciones as $notificacion) {
            if (!$notificacion->read_at) {
                $notificacion->read_at = Carbon::now();
                $notificacion->save();
            }
        }

        $notificaciones = NotificationResource::collection($notificaciones);
        return $this->showAllResourcesPaginate($notificaciones);
    }

    public function count()
    {
        $data = ["unread_count" => auth()->user()->unreadNotifications->count()];
        return $this->successMensaje($data, 200);
    }

    public function read($id)
    {
        DatabaseNotification::find($id)->markAsRead();
        return $this->successMensaje('Notificacion Marcada como leida', 201);
    }
}
