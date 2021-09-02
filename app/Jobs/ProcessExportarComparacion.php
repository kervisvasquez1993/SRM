<?php

namespace App\Jobs;

use App\Events\ArchivoComparacionListo;
use App\Exports\ComparativaExport;
use App\Tarea;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Maatwebsite\Excel\Facades\Excel;

class ProcessExportarComparacion implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $tarea;
    protected $usuario;

    public function __construct($usuario, $tarea)
    {
        error_log("construyendo");

        $this->tarea = $tarea;
        $this->usuario = $usuario;
    }

    public function handle()
    {
        error_log("empezando ejecusion");
        error_log("hola");
        error_log($this->usuario);
        error_log("dsk");
        $tareaId = $this->tarea->id . "dsa";
        $ruta = "comparaciones/$tareaId.xlsx";

        error_log("procesando");

        Excel::store(new ComparativaExport($this->tarea), $ruta, "s3");

        error_log("exportado");

        error_log("enviando link");
        event(new ArchivoComparacionListo($this->usuario, $this->tarea));

        error_log("link enviado");
    }
}
