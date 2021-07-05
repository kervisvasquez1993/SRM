<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tarea extends Model
{
    use SoftDeletes;
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

    public function sender()
    {
        return  $this->belongsTo(User::class, 'sender_id');
    }
}
