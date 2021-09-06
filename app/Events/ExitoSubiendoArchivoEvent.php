<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ExitoSubiendoArchivoEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $tarea;

    public function __construct($usuario, $operacion_id, $data)
    {
        $this->usuario = $usuario;
        $this->operacion_id = $operacion_id;
        $this->data = $data;
    }

    public function broadcastWith()
    {
        return [
            'data' => $this->data,
            'operacion_id' => $this->operacion_id,
        ];
    }

    public function broadcastOn()
    {
        error_log("Tratando de enviar mensaje");
        return new PrivateChannel("App.User.{$this->usuario->id}");
    }
}
