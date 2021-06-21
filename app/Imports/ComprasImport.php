<?php

namespace App\Imports;

use App\Compra;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;

class ComprasImport implements ToModel, WithStartRow, WithCalculatedFormulas
{
    public $pivot_id;
        
    public function __construct($pivot_id)
    {
        $this->pivot_id = $pivot_id; // errro en en linea
    }
    public function model(array $row)
    {
        $compras = 
        [
          'pivot_tarea_proveeder_id' => $this->pivot_id,
          'item' => $row[0],
          'descripcion' => $row[1],
          'registro_salud' => $row[2] ,
          'cantidad_ctns' => $row[3],
          'price' => $row[4],
          'total' => $row[5],
          'comprador' => auth()->user()->id
        ];

        $validator = Validator::make($compras, [
            'item' => 'required',
            'descripcion' => 'required',
            'registro_salud' => 'required',
            'cantidad_ctns' => 'required',
            'price' => 'required',
            'total' => 'required',
                ]);

        if ($validator->fails())
        {
            return null;
        }
        
        return new Compra($compras);
    }

    public function startRow(): int
    {
        return 15;
    }
}
