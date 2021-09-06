<?php

namespace App\Jobs;

use App\Events\ErrorSubiendoArchivoEvent;
use App\Events\ExitoSubiendoArchivoEvent;
use App\Events\ProgresoArchivoEvent;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

abstract class ImportarArchivoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $rutaArchivo;
    protected $operacionId;
    protected $usuario;
    protected $modelo;

    private $pasoActual = 0;

    public function __construct($archivo, $usuario, $modelo)
    {
        // Almacenar información para el job
        $this->operacionId = Str::uuid();
        $this->usuario = $usuario;
        $this->modelo = $modelo;

        // Guardar el archivo temporalmente
        // $ruta = "temp";
        // $ruta = Storage::put($ruta, $archivo);
        // $this->rutaArchivo = Storage::disk('public')->path($ruta);
        $ruta = "productos/temp";
        $this->rutaArchivo = Storage::disk('s3')->put($ruta, $archivo);
    }

    public function respuestaJson()
    {
        return ["operacion_id" => $this->operacionId, "mensaje" => "Importación de archivo comenzada"];
    }

    public function informarProgreso($progreso, $pasos = null)
    {
        error_log("Progreso: $progreso");

        if ($pasos) {
            $this->pasoActual++;

            $pasoMinimo = max($pasos / 50, 3);

            if ($this->pasoActual > $pasoMinimo) {
                event(new ProgresoArchivoEvent($this->usuario, $this->operacionId, $progreso));
                $this->pasoActual = 0;
            }
        } else {
            event(new ProgresoArchivoEvent($this->usuario, $this->operacionId, $progreso));
        }
    }

    abstract protected function procesar($archivo, $usuario, $modelo);

    abstract protected function respuesta();

    public function handle()
    {
        error_log("Empezando el procesado del archivo importado");

        // Obtener el archivo
        $archivo = Storage::disk("s3")->get($this->rutaArchivo);
        
        // Eliminarlo de S3
        Storage::disk('s3')->delete($this->rutaArchivo);

        // Almacenarlo temporalmente
        Storage::disk('local')->put($this->rutaArchivo, $archivo);
        
        $rutaEnDisco = storage_path("app/{$this->rutaArchivo}");

        try {
            // Guardar el archivo nuevo
            $this->procesar($rutaEnDisco, $this->usuario, $this->modelo);

            error_log("Archivo procesado con exito. Enviando respuesta...");

            // Información en
            event(new ExitoSubiendoArchivoEvent(
                $this->usuario,
                $this->operacionId,
                $this->respuesta())
            );
        } catch (\Throwable$th) {
            error_log($th->getMessage());

            error_log("Hubo un error procesando el archivo. Enviando respuesta...");

            // Información en
            event(new ErrorSubiendoArchivoEvent(
                $this->usuario,
                $this->operacionId,
                $th->getMessage())
            );
        }

        // Eliminar el archivo temporal
        Storage::disk("local")->delete($this->rutaArchivo);
    }
}
