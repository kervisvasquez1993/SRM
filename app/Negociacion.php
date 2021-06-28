<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Negociacion extends Model
{
    use SoftDeletes;
    public function pivotTable()
    {   
        return $this->belongsTo(PivotTareaProveeder::class, 'pivot_tarea_proveeder_id');
    }
}
