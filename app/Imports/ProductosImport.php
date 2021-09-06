<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;

class ProductosImport implements WithStartRow, WithCalculatedFormulas, WithChunkReading
{
    public function startRow(): int
    {
        return 4;
    }

    public function chunkSize(): int
    {
        return 10;
    }
}
