<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InicioProduccion extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'titulo',
        'descripcion'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
