<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PagoAnticipado extends Model
{
    public function pagoBalance()
    {
        return $this->hasOne(PagoBalance::class);
    }
}
