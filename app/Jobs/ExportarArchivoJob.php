<?php

namespace App\Jobs;

use App\Events\ProgresoArchivoEvent;
use App\Events\RespuestaArchivo;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

abstract class ExportarArchivoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $idOperacion;
    protected $usuario;
    protected $modelo;

    protected $campoRuta = "archivo";
    protected $campoCreacion = "creado_en";
    protected $campoEdicion = "actualizado_en";

    public function __construct($usuario, $modelo)
    {
        // Precargar informacion de ser necesario
        $this->antesExportar($modelo);

        // Almacenar información para el job
        $this->idOperacion = Str::uuid();
        $this->usuario = $usuario;
        $this->modelo = $modelo;
    }

    public function respuestaJson()
    {
        return ["id_operacion" => $this->idOperacion, "mensaje" => "Exportación de archivo comenzada"];
    }

    public function informarProgreso($progreso)
    {
        error_log("Progreso: $progreso");
        event(new ProgresoArchivoEvent($this->usuario, $this->idOperacion, $progreso));
    }

    abstract protected function antesExportar($tarea);

    abstract protected function almacenarArchivo();

    protected function respuesta()
    {
        return [];
    }

    public function handle()
    {
        error_log("Empezando exportacion del archivo: ruta");

        // ¿Se tiene que reconstruir el excel de nuevo?
        $fechaEdicion = Carbon::parse($this->modelo->{$this->campoEdicion});
        $fechaCreación = Carbon::parse($this->modelo->{$this->campoCreacion});

        $existe = ($this->modelo->{$this->campoCreacion}) != null;

        $exportarDeNuevo = $existe ? $fechaEdicion->gte($fechaCreación) : true;
        error_log("exportar de nuevo");
        error_log($exportarDeNuevo);

        $ruta = $this->modelo->{$this->campoRuta};

        if ($exportarDeNuevo) {
            error_log("Reconstruyendo archivo");

            try {
                // Guardar el archivo nuevo
                $ruta = $this->almacenarArchivo();

                // Guardar información en la tarea
                $this->modelo->{$this->campoRuta} = $ruta;
                $this->modelo->{$this->campoCreacion} = Carbon::now();
                $this->modelo->save();
            } catch (\Throwable$th) {
                error_log($th);
            }
        } else {
            error_log("El archivo ya se creo antes");
        }

        error_log("Enviando respuesta del archivo: $ruta");

        // Información en
        event(new RespuestaArchivo($this->usuario,
            $this->idOperacion,
            Storage::cloud()->url($ruta),
            $this->respuesta())
        );
    }
}
