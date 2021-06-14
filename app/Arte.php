<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Arte extends Model
{
    
    protected $fillable = [
        'nombre',
        'creacion_fichas',
        'validacion_fichas',
        'creacion_boceto',
        'validacion_boceto',
        'confirmacion_proveedor',
        'fecha_fin'
    ];


    public function pivotTable()
    {   
        return $this->belongsTo(PivotTareaProveeder::class, 'pivot_tarea_proveeder_id');
        
    }

    

    public function boceto()
    {
        return $this->hasMany(Boceto::class);
    }

    public function validacionBoceto()
    {
        return $this->hasMany(ValidacionBoceto::class);
    }

    public function ficha()
    {
        return $this->hasMany(Ficha::class);
    }

    public function validacionFicha()
    {
        return $this->hasMany(ValidacionFicha::class);
    }

    public function confirmacionProveedor()
    {
        return $this->hasMany(ConfirmacionProveedor::class);
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

    // Scope

    public function scopeCreacionFicha($query, $estatus)
    {
        if ( $estatus )
        {
           return $query->where('creacion_fichas', 'like', "%$estatus%") ;
        }

    }

    public function scopeValidacionFicha($query, $estatus)
    {
        if ( $estatus )
        {
           return $query->where('validacion_fichas', 'like', "%$estatus%") ;
        }
    }

    public function scopeCreacionBoceto($query, $estatus)
    {
        if ( $estatus )
        {
           return $query->where('creacion_boceto', 'like', "%$estatus%") ;
        }
    }

    public function scopeValidacionBoceto($query, $estatus)
    {
        if ( $estatus )
        {
           return $query->where('validacion_boceto', 'like', "%$estatus%") ;
        }
    }

    public function scopeConfirmacionProveedor($query, $estatus)
    {
        if ( $estatus )
        {
           return $query->where('confirmacion_proveedor', 'like', "%$estatus%") ;
        }
    }


}
