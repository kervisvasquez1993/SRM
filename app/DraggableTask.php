<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DraggableTask extends Model
{
    public function tarea()
    {
        return $this->belongsTo(Tarea::class, 'tarea_id');
    }
}
