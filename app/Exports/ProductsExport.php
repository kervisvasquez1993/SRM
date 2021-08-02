<?php

namespace App\Exports;

use App\Producto;
use Maatwebsite\Excel\Excel;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Concerns\FromCollection;

class Export implements WithEvents
{
    public function registerEvents(): array
    {
      return [
         BeforeExport::class => function(BeforeExport $event){
            $event->writer->reopen(new \Maatwebsite\Excel\Files\LocalTemporaryFile(storage_path('plantilla.xlsx')),Excel::XLSX);

            error_log("hola desde ejecuacion");

            $event->writer->getSheetByIndex(0);
            $event->getWriter()->getSheetByIndex(0)->setCellValue('A1','Your Value');
            return $event->getWriter()->getSheetByIndex(0);
         }
      ];
    }
}
