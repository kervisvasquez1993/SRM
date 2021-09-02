<?php

namespace App\Jobs;

use App\Events\RespuestaArchivo;
use App\Exports\ComparativaExport;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

abstract class ProcessExportarArchivo implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $usuario;
    protected $archivo;

    public function __construct($usuario, $modelo)
    {
        error_log("construyendo");

        // Determinar si existe un archivo y crearlo de ser necesario

        // Precargar información
        $this->usuario = $usuario;
        $this->archivo = null;

        $this->antesExportar($modelo);
    }

    abstract protected function antesExportar($tarea);

    abstract protected function ultimaActualizacion();

    abstract protected function almacenarArchivo();

    abstract protected function construirMensaje();

    protected function nombreArchivo()
    {
        // Virtual
    }

    public function handle()
    {
        // ¿Se tiene que reconstruir el excel de nuevo?
        $fechaEdicion = $this->ultimaActualizacion();
        $fechaCreación = Carbon::parse($this->$archivo->exportado_en);

        $exportarDeNuevo = $this->$archivo->exportado_en ? $fechaEdicion->gte($fechaCreación) : true;

        $ruta = $this->$archivo->ruta;

        if ($exportarDeNuevo) {
            error_log("Reconstruyendo archivo");
            
            try {
                // Guardar el archivo nuevo
                $ruta = $this->almacenarArchivo();
                
                // Guardar información en la tarea
                $this->tarea->archivo_comparacion = Storage::cloud()->url($ruta);
                $this->tarea->exportando_comparacion = false;
                $this->tarea->archivo_comparacion_creado_en = Carbon::now();
                $this->tarea->save();
            } catch (\Throwable$th) {
                // Guardar información en la tarea
                $this->tarea->exportando_comparacion = false;
                $this->tarea->error_exportando = true;
                $this->tarea->save();

                error_log($th);
            }
        } else {
            error_log("El archivo ya se creo antes");

            // Guardar información en la tarea
            $this->tarea->exportando_comparacion = false;
            $this->tarea->save();
        }

        error_log("Enviando respuesta del archivo: $ruta");

        // Información en
        event(new RespuestaArchivo($this->usuario, $ruta, $this->construirMensaje()));
    }
}
