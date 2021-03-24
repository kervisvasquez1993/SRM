<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ficha extends Model
{
    public function arte()
    {
        return $this->belongsTo(Arte::class, 'arte_id');
    }
}
