<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class IncidenciaPivot extends Model
{
    use SoftDeletes;
   protected $fillable =  
    [
        'tarea_id',
        'user_id',
        'titulo',
        'descripcion'
    ];
   
    

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


}
