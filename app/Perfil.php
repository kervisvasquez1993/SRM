<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Perfil extends Model
{
    protected $table = 'perfils';
    protected $fillable = [
        'user_id', 'biografia', 'imagen',
    ];
    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
