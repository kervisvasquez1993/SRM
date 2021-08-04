<?php

namespace App\Imports;

use App\Producto;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;


class ProductosImport implements WithStartRow, WithCalculatedFormulas //ToCollection, WithStartRow, WithCalculatedFormulas
{


    public function startRow(): int
    {
        return 4;
    }
}
