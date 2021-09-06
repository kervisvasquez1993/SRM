<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ErrorSubiendoArchivoEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct($usuario, $operacion_id, $error)
    {
        $this->usuario = $usuario;
        $this->operacion_id = $operacion_id;
        $this->error = $error;
    }

    public function broadcastWith()
    {
        return [
            'error' => $this->error,
            'operacion_id' => $this->operacion_id,
        ];
    }

    public function broadcastOn()
    {
        return new PrivateChannel("App.User.{$this->usuario->id}");
    }
}
