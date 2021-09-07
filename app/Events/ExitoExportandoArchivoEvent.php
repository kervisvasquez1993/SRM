<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ExitoExportandoArchivoEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $operacionId;
    public $archivoNombre;
    public $archivoUrl;

    public function __construct($usuario, $operacionId, $archivoNombre, $archivoUrl, $data)
    {
        $this->usuario = $usuario;
        $this->operacionId = $operacionId;
        $this->archivoNombre = $archivoNombre;
        $this->archivoUrl = $archivoUrl;
        $this->data = $data;
    }

    public function broadcastWith()
    {
        return [
            'operacionId' => $this->operacionId,
            'archivoNombre' => $this->archivoNombre,
            'archivoUrl' => $this->archivoUrl,
            'data' => $this->data,
        ];
    }

    public function broadcastOn()
    {
        error_log("Tratando de enviar mensaje");
        return new PrivateChannel("App.User.{$this->usuario->id}");
    }
}
