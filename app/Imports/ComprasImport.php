<?php

namespace App\Imports;

use App\Compra;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;

class ComprasImport implements ToModel, WithStartRow 
{
    public $pivot_id;
        
    public function __construct($pivot_id)
    {
        $this->pivot_id = $pivot_id; // errro en en linea
    }
    public function model(array $row)
    {
        
        $compra = 
        [
            
        ];
        
        return new Compra([
            //
        ]);
    }

    public function startRow(): int
    {
        return 22;
    }
}
