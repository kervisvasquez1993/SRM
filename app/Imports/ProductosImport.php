<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;
use Maatwebsite\Excel\Concerns\WithStartRow;

class ProductosImport implements WithStartRow, WithCalculatedFormulas
{
    public function startRow(): int
    {
        return 4;
    }
}
