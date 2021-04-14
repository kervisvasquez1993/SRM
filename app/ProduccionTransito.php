<?php

namespace App;

use App\PivotTareaProveeder;
use Illuminate\Database\Eloquent\Model;

class ProduccionTransito extends Model
{
    public function pivotTable()
    {   
        return $this->belongsTo(PivotTareaProveeder::class, 'pivot_tarea_proveeder_id');
        
    }

    public function pagosAnticipados()
    {
        return $this->hasMany(PagoAnticipado::class);
    }

    public function pagosBalance()
    {
        return $this->hasMany(PagoBalance::class);
    }

    public function transitosNacionalizacion()
    {
        return $this->hasMany(TransitoNacionalizacion::class);
    }
}
