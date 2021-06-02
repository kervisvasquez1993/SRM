<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    public function principalPivot()
    {
        return $this->hasMany(PivotTareaProveeder::class);
    }

    public function pivotTareaProveedor()
    {
        return $this->hasMany(PivotTareaProveeder::class);
    }

    public function usuarios()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function proveedor()
    {
        return $this->belongsToMany(Proveedor::class, 'pivot_tarea_proveeders', 'tarea_id', 'proveedor_id' );
    }

    public function proveedores()
    {
        return $this->belongsToMany(Proveedor::class, 'pivot_tarea_proveeders', 'tarea_id', 'proveedor_id' );
    }

    public function usuario()
    {
        return  $this->belongsTo(User::class, 'user_id');
    }
}
