<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Negociacion extends Model
{
    public function pivotTable()
    {   
        return $this->belongsTo(PivotTareaProveeder::class, 'pivot_tarea_proveeder_id');
    }
}
