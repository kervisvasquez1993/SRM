<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PagoAnticipado extends Model
{
    use SoftDeletes;
    protected $fillable =
    [
        'titulo', 'monto_total', 'porcentaje', 'file_pago', 'fecha_pago', 'descripcion'
    ];
    
    public function pagoBalance()
    {
        return $this->hasOne(PagoBalance::class);
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