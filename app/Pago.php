<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pago extends Model
{
    use SoftDeletes;
    protected $fillable =
    [
        'user_id',
        'titulo',
        'url_archivo_factura',
        'monto',
        'fecha',
    ];

    protected $casts = [
        'monto' => 'double'
    ];

    public function produccionTransito()
    {
        return $this->hasOne(ProduccionTransito::class, 'produccion_transito_id');
    }
}
