<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RespuestaArchivo implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $tarea;
    public $archivo;

    public function __construct($usuario, $archivo, $data)
    {
        $this->usuario = $usuario;
        $this->archivo = $archivo;
        $this->data = $data;
    }

    public function broadcastWith()
    {
        return [
            'data' => $this->data,
            'archivo' => $this->archivo
        ];
    }

    public function broadcastOn()
    {
        error_log("Tratando de enviar mensaje");
        return new PrivateChannel("App.User.{$this->usuario->id}");
    }
}
