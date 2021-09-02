<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class ArchivoComparacionListo implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $tarea;
    protected $ruta;

    public function __construct($usuario, $tarea)
    {
        $this->tarea = $tarea;
        $this->usuario = $usuario;

        error_log("mensaje construido");
    }

    public function broadcastOn()
    {
        error_log("tratando de transmitir");
        $nombre = "comparacion.{$this->usuario->id}";

        return new PrivateChannel($nombre);
    }
}
