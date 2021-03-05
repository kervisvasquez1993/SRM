<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PagoBalance extends Model
{
    public function pagoAnticipado()
    {
        return $this->belongsTo(PagoAnticipado::class, 'pago_anticipado');
    }
}
