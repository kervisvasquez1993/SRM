<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ficha extends Model
{
    use SoftDeletes;
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
