<?php

namespace App;

use App\PivotTareaProveeder;
use Illuminate\Database\Eloquent\Model;

class ProduccionTransito extends Model
{
    protected $fillable =
    [
        'pagos_anticipados',
        'inicio_produccion',
        'fin_produccion',
        'pago_balance',
        'transito_nacionalizacion',
        'fin_produccion_transito',
        'salida_puero_origen',


    ];
   
    public function pivotTable()
    {   
        return $this->belongsTo(PivotTareaProveeder::class, 'pivot_tarea_proveeder_id');
        
    }
    
    public function pagosBalance()
    {
        return $this->hasOne(PagoBalance::class);
    }

    public function pagosAnticipados()
    {
        return $this->hasOne(PagoAnticipado::class);
    }
    
    public function inicioProduccion()
    {
        return $this->hasMany(InicioProduccion::class);
    }
   
    public function transitosNacionalizacion()
    {
        return $this->hasMany(TransitoNacionalizacion::class);
    }

    public function finProduccion()
    {
        return $this->hasMany(FinProduccion::class);
    }


    public function filter()
    {
        return $this->hasMany(FilterProduccionTransito::class);
    }

    public function scopeWidthFilters($query, $pivot )
    {
            return $query->when(count($pivot), function($query) use ($pivot){
                   $query->whereIn('pivot_tarea_proveeder_id', $pivot);
            });

    }
    
}
