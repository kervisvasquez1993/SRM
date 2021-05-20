<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FilterProduccionTransito extends Model
{
    protected $fillable = ['proveedor_id', 'user_id', 'produccion_transitos_id', 'pivot_tarea_proveedor_id'];
    
    
    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class, 'proveedor_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function produccionTransito()
    {
        return $this->belongsTo(ProduccionTransito::class, 'produccion_transitos_id');
    }

    public function pivotTareaProveeedor()
    {
        return $this->belongsTo(PivotTareaProveeder::class, 'pivot_tarea_proveedor_id');
    }
    
    public function scopeWidtFilter($query, $proveedor,$user,$produccion_transito, $pivot_tarea_proveedor)
    {
        
     return $query->when(count($proveedor), function($query) use ($proveedor){
            $query->whereIn('code_unit', $proveedor);
     })
     ->when(count($user), function($query) use ($user){
         $query->whereIn('user_id', $user);
     })
     ->when(count($produccion_transito), function($query) use ($produccion_transito){
         $query->whereIn('produccion_transitos_id', $produccion_transito);
     })
     ->when(count($pivot_tarea_proveedor), function($query) use ($pivot_tarea_proveedor){
        $query->whereIn('pivot_tarea_proveedor_id', $pivot_tarea_proveedor );
     });
   }
}


