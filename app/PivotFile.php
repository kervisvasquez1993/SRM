<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PivotFile extends Model
{
    
    use SoftDeletes;
    protected  $fillable = [
        'pivot_tarea_proveeder_id',
        'url',
    ];
    public function pivotTareaProveeder()
    {
        return $this->belongsTo(PivotTareaProveeder::class, 'pivot_tarea_proveeder_id');
    }
}
