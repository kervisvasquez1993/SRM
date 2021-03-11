<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Arte extends Model
{
    public function pivotTable()
    {   
        return $this->belongsTo(PivotTareaProveeder::class, 'pivot_tarea_proveeder_id');
        
    }

    public function bocetoStatus()
    {
        return $this->belongsTo(BocetoStatu::class, 'boceto_status_id');
    }

    public function validacionFichaStatus()
    {
        return $this->belongsTo(BocetoStatu::class, 'validacion_ficha_status_id');
    }

    public function confirmacionProveedor()
    {
        return $this->belongsTo(BocetoStatu::class, 'confirmacion_proveedor_estatus_id');
    }

    public function fichaStatus()
    {
        return $this->belongsTo(BocetoStatu::class, 'ficha_status_id');
    }

   

    public function validacionBocetoStatus()
    {
        return $this->belongsTo(BocetoStatu::class, 'validacion_boceto_status_id');
    }
}
