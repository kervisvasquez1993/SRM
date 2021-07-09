<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DraggableTask extends Model
{
    /* use HasFactory; */
    public function tareas()
    {
        return $this->belongsTo(Tarea::class, 'tarea_id');
    }


}
