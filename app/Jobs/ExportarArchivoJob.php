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

    private $pasoActual = 0;

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

    public function informarProgreso($progreso, $pasos = null)
    {
        error_log("Progreso: $progreso");

        if ($pasos) {
            $this->pasoActual++;

            $pasoMinimo = max($pasos / 50, 3);

            if ($this->pasoActual > $pasoMinimo) {
                event(new ProgresoArchivoEvent($this->usuario, $this->idOperacion, $progreso));
                $this->pasoActual = 0;
            }
        } else {
            event(new ProgresoArchivoEvent($this->usuario, $this->idOperacion, $progreso));
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

        // Información en
        event(new RespuestaArchivo($this->usuario,
            $this->idOperacion,
            Storage::cloud()->url($ruta),
            $this->respuesta())
        );
    }
}
