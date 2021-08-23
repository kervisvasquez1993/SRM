<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class IncidenciaTarea extends Model
{
    use SoftDeletes;

    protected $table = "incidencia_tareas";
    protected $fillable =
        [
        'tarea_id',
        'user_id',
        'titulo',
        'descripcion',
    ];

    public function tarea()
    {
        return $this->belongsTo(Tarea::class, 'tarea_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
