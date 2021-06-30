<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RecepcionReclamoDevolucion extends Model
{
    use SoftDeletes;
    protected $fillable =
    [
        'recepcion_mercancia',
        'inspeccion_carga',
        'reclamos_devoluciones'
    ];

    public function ProduccionTransito()
    {
        return $this->belongsTo(ProduccionTransito::class, 'produccion_transito_id');
    }

    public function recepcionMercancia()
    {
        return $this->hasMany(RecepcionMercancia::class);
    }

    public function inspeccionCarga()
    {
        return $this->hasMany(InspeccionCarga::class);
    }

    public function reclamoDevolucion()
    {
        return $this->hasMany(ReclamosDevolucione::class);
    }
    public function recepcionProducto()
    {
        return $this->hasMany(RecepcionProducto::class);
    }

    public function inspeccionProducto()
    {
        return $this->hasMany(InspeccionProducto::class);
    }
}
