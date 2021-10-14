<?php

namespace App\Exports;

use App\Compra;
use Maatwebsite\Excel\Concerns\FromCollection;

class ComprasExport implements FromCollection
{
    public $pivot_id;
        
    public function __construct($pivot_id)
    {
        $this->pivot_id = $pivot_id; 
    }

    public function collection()
    {
        return Compra::where('pivot_tarea_proveeder_id', $this->pivot_id)->get();
    }
}
