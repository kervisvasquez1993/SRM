<?php

namespace App\Jobs;

use App\Exports\ComparativaExport;
use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Facades\Excel;

class ExportarComparacionJob extends ProcessExportarArchivo
{
    protected $tarea;

    public function antesExportar($tarea)
    {
        // Precargar información
        $tarea = $tarea->with("pivotTareaProveedor", "comparaciones.filas.celdas")->first();

        // Guardar informacion nueva
        $tarea->exportando_comparacion = true;
        $tarea->error_exportando = false;
        $tarea->save();

        // Informacion para el job
        $this->tarea = $tarea;
    }

    public function ultimaActualizacion()
    {
        return Carbon::parse($this->tarea->comparacion_editadas_en);
    }

    protected function almacenarArchivo()
    {
        $ruta = "comparaciones/{$this->tarea->id}.xlsx";
        Excel::store(new ComparativaExport($this->tarea), $ruta, "s3", null, ['visibility' => 'public']);

        return $ruta;
    }

    protected function construirMensaje()
    {
        $data = [
            'tarea' => [
                'id' => $this->tarea->id,
                'archivo_comparacion' => $this->tarea->archivo_comparacion,
                'archivo_comparacion_creado_en' => $this->tarea->archivo_comparacion_creado_en,
                'error_exportando' => $this->tarea->error_exportando,
            ],
        ];

        return $data;
    }

    protected function despuesExportar()
    {
        $data = [
            'tarea' => [
                'id' => $this->tarea->id,
                'archivo_comparacion' => $this->tarea->archivo_comparacion,
                'archivo_comparacion_creado_en' => $this->tarea->archivo_comparacion_creado_en,
                'error_exportando' => $this->tarea->error_exportando,
            ],
        ];

        return $data;
    }
}
