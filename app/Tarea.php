<?php

namespace App;

use Illuminate\Support\Carbon;
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
        // 'comparaciones'
    ];

    // protected $attributes = [
    //     'comparaciones' => '[]'
    // ];

    // protected $casts = [
    //     'comparaciones' => 'object'
    // ];

    protected $appends = ['cantidad_negociaciones', 'cantidad_proveedores'];

    public function getCantidadNegociacionesAttribute()
    {
        return $this->pivotTareaProveedor()->count();
    }

    public function getCantidadProveedoresAttribute()
    {
        return $this->proveedores->count();
    }

    public function draggableTasks()
    {
        return $this->hasMany(DraggableTask::class);
    }
    
    public function principalPivot()
    {
        return $this->hasMany(PivotTareaProveeder::class);
    }

    public function pivotTareaProveedor()
    {
        return $this->hasMany(PivotTareaProveeder::class);
    }

    public function negociaciones()
    {
        return $this->hasMany(PivotTareaProveeder::class);
    }

    public function usuarios()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function incidenciaTarea()
    {
        return $this->hasMany(IncidenciaTarea::class);
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

    public function comparaciones()
    {
        return $this->hasMany(Comparacion::class);
    }

    public function actualizarFechaEdicionComparacion()
    {
        $this->comparacion_editadas_en = Carbon::now();
        $this->save();
    }
}
