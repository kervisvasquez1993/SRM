<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ficha extends Model
{
    public function arte()
    {
        return $this->belongsTo(Arte::class, 'arte_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
