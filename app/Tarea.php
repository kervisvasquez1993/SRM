<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tarea extends Model
{
    use SoftDeletes;

    protected $fillable =
    [
        'nombre',
        'user_id',
        'descripcion',
        'fecha_fin',
        'comparaciones'
    ];

    protected $attributes = [
        'comparaciones' => '[]'
    ];

    public function draggebleTask()
    {
        return $this->hasMany(DraggebleTask::class);
    }
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
    /* TODO: ACTUALIZAR CODIGO */
    public function coordinador()
    {
        return $this->hasOne(User::class, 'sender_id');
    }

    public function proveedor()
    {
        return $this->belongsToMany(Proveedor::class, 'pivot_tarea_proveeders', 'tarea_id', 'proveedor_id');
    }

    public function proveedores()
    {
        return $this->belongsToMany(Proveedor::class, 'pivot_tarea_proveeders', 'tarea_id', 'proveedor_id');
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
