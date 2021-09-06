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

    protected $operacionId;
    protected $usuario;
    protected $modelo;

    protected $campoRuta = "archivo";
    protected $campoCreacion = "creado_en";
    protected $campoEdicion = "actualizado_en";

    private $pasoActual = 0;

    public function __construct($usuario, $modelo)
    {
        // Precargar informacion de ser necesario
        $this->antesExportar($modelo);

        // Almacenar información para el job
        $this->operacionId = Str::uuid();
        $this->usuario = $usuario;
        $this->modelo = $modelo;
    }

    public function respuestaJson()
    {
        return ["operacion_id" => $this->operacionId, "mensaje" => "Exportación de archivo comenzada"];
    }

    public function informarProgreso($progreso, $instantaneo = false)
    {
        $ahora = microtime(true);

        if (!property_exists($this, "contador")) {
            $this->contador = $ahora;
        }

        if ($ahora - $this->contador > 0.4 || $instantaneo) {
            event(new ProgresoArchivoEvent($this->usuario, $this->operacionId, $progreso));
            $this->contador = $ahora;
        }
    }

    abstract protected function antesExportar($tarea);

    abstract protected function almacenarArchivo();

    protected function respuesta()
    {
        return [];
    }

    public function handle()
    {
        error_log("Empezando exportacion del archivo");

        $ram = memory_get_usage(true) / 1000;
        error_log("Memoria ram inicial: $ram");

        // ¿Se tiene que reconstruir el excel de nuevo?
        $fechaEdicion = Carbon::parse($this->modelo->{$this->campoEdicion});
        $fechaCreación = Carbon::parse($this->modelo->{$this->campoCreacion});

        $sinFecha = ($this->modelo->{$this->campoCreacion}) == null || ($this->modelo->{$this->campoEdicion}) == null;

        $exportarDeNuevo = $sinFecha ? true : $fechaEdicion->gte($fechaCreación);

        $ruta = $this->modelo->{$this->campoRuta};

        if ($exportarDeNuevo) {
            error_log("Reconstruyendo archivo");

            try {
                // Guardar el archivo nuevo
                $ruta = $this->almacenarArchivo();

                error_log("Archivo almacenado");

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
        $ram = memory_get_usage(true) / 1000;
        error_log("Memoria ram final: $ram");

        // Información en
        event(new RespuestaArchivo($this->usuario,
            $this->operacionId,
            Storage::cloud()->url($ruta),
            $this->respuesta())
        );
    }
}
