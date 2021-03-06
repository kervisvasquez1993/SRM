<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FinProduccion extends Model
{
    public function produccionTransito()
    {
        return $this->hasOne(ProduccionTransito::class, 'produccion_transito_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
