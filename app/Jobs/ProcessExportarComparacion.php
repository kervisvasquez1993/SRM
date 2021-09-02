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

class ProcessExportarComparacion implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $tarea;
    protected $usuario;
    protected $exportarDeNuevo;

    public function __construct($usuario, $tarea)
    {
        error_log("construyendo");

        // Precargar información
        // $tarea = $tarea->with("pivotTareaProveedor", "comparaciones.filas.celdas")->first();

        // ¿Se tiene que reconstruir el excel de nuevo?
        $fechaEdicion = Carbon::parse($tarea->comparacion_editadas_en);
        $fechaCreación = Carbon::parse($tarea->archivo_comparacion_creado_en);
        $this->exportarDeNuevo = $tarea->archivo_comparacion_creado_en ? $fechaEdicion->gte($fechaCreación) : true;

        // Informacion para el job
        $this->tarea = $tarea;
        $this->usuario = $usuario;

        // Guardar informacion nueva
        $tarea->exportando_comparacion = true;
        $tarea->error_exportando = false;
        $tarea->save();

        error_log("Esta tarea tiene id: $tarea->id");
    }

    public function handle()
    {
        $ruta = "comparaciones/{$this->tarea->id}.xlsx";
        error_log("Empezando exportacion del archivo: $ruta");

        if ($this->exportarDeNuevo) {
            error_log("Reconstruyendo archivo");

            try {
                // Guardar el archivo
                Excel::store(new ComparativaExport($this->tarea), $ruta, "s3", null, ['visibility' => 'public']);

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

        $data = [
            'tarea' => [
                'id' => $this->tarea->id,
                'archivo_comparacion' => $this->tarea->archivo_comparacion,
                'archivo_comparacion_creado_en' => $this->tarea->archivo_comparacion_creado_en,
                'error_exportando' => $this->tarea->error_exportando,
            ],
        ];

        // Información en
        event(new RespuestaArchivo($this->usuario, $this->tarea->archivo_comparacion, $data));
    }
}
