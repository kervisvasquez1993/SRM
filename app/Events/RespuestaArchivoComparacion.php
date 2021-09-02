<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RespuestaArchivoComparacion implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $tarea;

    public function __construct($usuario, $tarea)
    {
        $this->tarea = $tarea;
        $this->usuario = $usuario;
    }

    public function broadcastWith()
    {
        return [
            'tarea' => [
                'id' => $this->tarea->id,
                'archivo_comparacion' => $this->tarea->archivo_comparacion,
                'archivo_comparacion_creado_en' => $this->tarea->archivo_comparacion_creado_en,
                'error_exportando' => $this->tarea->error_exportando,
            ],
        ];
    }

    public function broadcastOn()
    {
        error_log("Tratando de enviar mensaje");
        $nombre = "comparacion.{$this->usuario->id}";
        return new PrivateChannel($nombre);
    }
}
