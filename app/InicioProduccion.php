<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InicioProduccion extends Model
{
    protected $fillable = [
        'titulo',
        'descripcion'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
