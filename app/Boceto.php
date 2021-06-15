<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Boceto extends Model
{

    protected $fillable = [
        'titulo',
        'descripcion'
    ];
    public function arte()
    {
        return $this->belongsTo(Arte::class, 'arte_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
