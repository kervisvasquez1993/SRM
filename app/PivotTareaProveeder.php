<?php

namespace App;

use App\Arte;
use App\ProduccionTransito;
use App\Proveedor;
use App\Tarea;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PivotTareaProveeder extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'compra_po',
        'productos_cargados',
        'productos_confirmados',
        'iniciar_produccion',
        'orden_compra',
        'codigo_barra_finalizado',
        'base_grafico_finalizado',
        'seleccionado',
        'iniciar_arte',
        'iniciar_negociacion',
        'payment_terms',
        'hs_code',
        'incoterms',
        'delivery_time',
        'codigo_comprador',
        'orden_compra_directa',
        'total_pagar',
    ];

    protected $appends = ['cantidad_productos'];

    public function getCantidadProductosAttribute()
    {
        return $this->productos()->count();
    }

    public function compras()
    {
        return $this->hasMany(Compra::class);
    }

    public function productos()
    {
        return $this->hasMany(Producto::class);
    }
    public function tarea()
    {
        return $this->belongsTo(Tarea::class, 'tarea_id');
    }

    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class, 'proveedor_id');
    }

    public function artes()
    {
        return $this->hasMany(Arte::class);
    }

    public function arte()
    {
        return $this->hasOne(Arte::class);
    }

    public function produccionTransito()
    {
        return $this->hasOne(ProduccionTransito::class);
    }

    public function pivotFile()
    {
        return $this->hasMany(PivotFile::class);
    }
}
