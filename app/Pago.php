<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    
    protected $fillable = 
    [
        'titulo',
        'url_archivo_factura',
        'tipo',
        'monto'
    ];
    public function produccionTransito()
    {
        return $this->hasOne(ProduccionTransito::class, 'produccion_transito_id');
    }
}
