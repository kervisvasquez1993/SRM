<?php

namespace App\Imports;

use App\RecepcionProducto;
use Maatwebsite\Excel\Concerns\ToModel;

class RecepcionProductoImport implements ToModel
{
   
    public function model(array $row)
    {
        return new RecepcionProducto([
            
        ]);
    }
}
