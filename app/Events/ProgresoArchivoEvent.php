<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProgresoArchivoEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $usuario;
    public $operacion_id;
    public $progreso;

    public function __construct($usuario, $operacion_id, $progreso)
    {
        $this->usuario = $usuario;
        $this->operacion_id = $operacion_id;
        $this->progreso = $progreso;
    }

    public function broadcastOn()
    {
        return new PrivateChannel("App.User.{$this->usuario->id}");
    }
}
