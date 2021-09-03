<?php

namespace App\Jobs;

use App\Exports\ProductosExport;
use Maatwebsite\Excel\Facades\Excel;

class ExportarProductosJob extends ExportarArchivoJob
{
    protected $campoRuta = "archivo_productos";
    protected $campoCreacion = "archivo_productos_creado_en";
    protected $campoEdicion = "productos_editados_en";

    public function antesExportar($modelo)
    {
        $modelo = $modelo->with("productos")->first();
    }

    protected function almacenarArchivo()
    {
        $ruta = "productos/{$this->modelo->id}.xlsx";
        Excel::store(new ProductosExport($this->modelo, $this), $ruta, "s3", null, ['visibility' => 'public']);
        return $ruta;
    }

    protected function ruta()
    {
        return "productos/{$this->modelo->id}.xlsx";
    }
}
