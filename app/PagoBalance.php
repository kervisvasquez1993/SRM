<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PagoBalance extends Model
{
    use SoftDeletes;
    public function pagoAnticipado()
    {
        return $this->belongsTo(PagoAnticipado::class, 'pago_anticipado_id');
    }

    public function produccionTransito()
    {
        return $this->hasOne(ProduccionTransito::class, 'produccion_transito_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
