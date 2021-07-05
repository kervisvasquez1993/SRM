<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FcmToken extends Model
{
    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
