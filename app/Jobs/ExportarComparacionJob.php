<?php

namespace App\Jobs;

use App\Exports\ComparativaExport;
use Maatwebsite\Excel\Facades\Excel;

class ExportarComparacionJob extends ExportarArchivoJob
{
    protected $campoRuta = "archivo_comparacion";
    protected $campoCreacion = "archivo_comparacion_creado_en";
    protected $campoEdicion = "comparacion_editadas_en";

    public function antesExportar($modelo)
    {
        $this->archivoNombre = "Comparativa {$modelo->nombre}.xlsx";
        $modelo = $modelo->with("pivotTareaProveedor", "comparaciones.filas.celdas")->first();
    }

    protected function almacenarArchivo()
    {
        $ruta = "comparaciones/{$this->modelo->id}.xlsx";
        Excel::store(new ComparativaExport($this->modelo, $this), $ruta, "s3", null, ['visibility' => 'public']);
        return $ruta;
    }

    protected function ruta()
    {
        return "comparaciones/{$this->modelo->id}.xlsx";
    }

    // protected function respuesta()
    // {
    //     return [];
    // }
}
