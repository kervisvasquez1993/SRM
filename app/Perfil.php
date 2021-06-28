<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Perfil extends Model
{
    use SoftDeletes;
    protected $table = 'perfils';
    protected $fillable = [
        'user_id', 'biografia', 'imagen',
    ];
    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
