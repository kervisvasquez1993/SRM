<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Estatus extends Model
{
    protected $table = 'estatus';

    public function artes()
    {
        return $this->hasMany(Arte::class);
    }

}
