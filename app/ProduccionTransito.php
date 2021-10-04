<?php

namespace App;

use App\Pago;
use App\PivotTareaProveeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProduccionTransito extends Model
{
    use SoftDeletes;
    protected $fillable =
    [
        'pagos_anticipados',
        'inicio_produccion',
        'inicio_produccion_fecha',
        'fin_produccion',
        'fin_produccion_fecha',
        'pago_balance',
        'transito',
        'transito_fecha',
        'nacionalizacion',
        'nacionalizacion_fecha',
        'salida_puerto_origen',
        'salida_puerto_origen_fecha',
        'fecha_entrega_aproximada'
    ];
   
    public function pivotTable()
    {   
        return $this->belongsTo(PivotTareaProveeder::class, 'pivot_tarea_proveeder_id');
        
    }
    
    public function pagos()
    {
        return $this->hasMany(Pago::class);
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

    public function recepcionReclamoDevolucion()
    {
        return $this->hasOne(RecepcionReclamoDevolucion::class);
    }
    
}
