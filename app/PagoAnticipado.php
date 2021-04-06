<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PagoAnticipado extends Model
{
    public function pagoBalance()
    {
        return $this->hasOne(PagoBalance::class);
    }
    
    public function produccionTransito()
    {
        return $this->hasOne(ProduccionTransito::class, 'produccion_transito_id');
    }
}