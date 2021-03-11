<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Arte extends Model
{
    public function pivotTable()
    {   
        return $this->belongsTo(PivotTareaProveeder::class, 'pivot_tarea_proveeder_id');
        
    }

    public function fichasEstatus()
    {
        return $this->belongsTo(Estatus::class, 'creacion_fichas');
    }

    public function validacionFichasEstatus()
    {
        return $this->belongsTo(Estatus::class, 'validacion_fichas');
    }

    public function bocetosEstatus()
    {
        return $this->belongsTo(Estatus::class, 'creacion_boceto');
    }

    public function validacionBocetosEstatus()
    {
        return $this->belongsTo(Estatus::class, 'validacion_boceto');
    }

    public function confirmacionProveedorEstatus()
    {
        return $this->belongsTo(Estatus::class, 'confirmacion_proveedor');
    }


}
