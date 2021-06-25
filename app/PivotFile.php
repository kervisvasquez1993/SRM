<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PivotFile extends Model
{
    public function pivotTareaProveeder()
    {
        return $this->belongsTo(PivotTareaProveeder::class, 'pivot_tarea_proveeder_id');
    }
}
