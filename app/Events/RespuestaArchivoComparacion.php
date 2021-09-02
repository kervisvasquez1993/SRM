<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class RespuestaArchivoComparacion implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $tarea;

    public function __construct($usuario, $tarea)
    {
        $this->tarea = $tarea;
        $this->usuario = $usuario;
    }

    public function broadcastOn()
    {
        error_log("Tratando de enviar mensaje");
        $nombre = "comparacion.{$this->usuario->id}";
        return new PrivateChannel($nombre);
    }
}
