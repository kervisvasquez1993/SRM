<?php

namespace App\Jobs;

use App\Events\RespuestaArchivoComparacion;
use App\Exports\ComparativaExport;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Facades\Excel;

class ProcessExportarComparacion implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $tarea;
    protected $usuario;
    protected $exportarDeNuevo;

    public function __construct($usuario, $tarea)
    {
        // Informacion para el job
        $this->tarea = $tarea;
        $this->usuario = $usuario;

        error_log("construyendo");

        // Precargar información
        $tarea = $tarea->with("pivotTareaProveedor", "comparaciones.filas.celdas")->first();

        // ¿Se tiene que reconstruir el excel de nuevo?
        $fechaEdicion = Carbon::parse($tarea->comparacion_editadas_en);
        $fechaCreación = Carbon::parse($tarea->archivo_comparacion_creado_en);
        $this->exportarDeNuevo = $fechaEdicion->gt($fechaCreación);

        $this->tarea->exportando_comparacion = true;
        $this->tarea->error_exportando = false;
        $tarea->save();
    }

    public function handle()
    {
        $ruta = "comparaciones/{$this->tarea->id}.xlsx";
        error_log("Empezando exportacion del archivo: $ruta");

        if ($this->exportarDeNuevo) {
            error_log("Reconstruyendo archivo");

            try {

                // Guardar el archivo nuevo
                Excel::store(new ComparativaExport($this->tarea), $ruta, "s3");

                // Guardar información en la tarea
                $this->tarea->archivo_comparacion = $ruta;
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
        }

        error_log("Enviando respuesta del archivo: $ruta");
        event(new RespuestaArchivoComparacion($this->usuario, $this->tarea));
    }
}
