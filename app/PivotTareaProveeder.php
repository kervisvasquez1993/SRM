<?php

namespace App;

use App\Arte;
use App\Tarea;
use App\Proveedor;
use App\ProduccionTransito;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class PivotTareaProveeder extends Model
{
    public function tarea()
    {
        return $this->belongsTo(Tarea::class, 'tarea_id');
    }

    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class, 'proveedor_id');
    }

    public function artes()
    {
        return $this->hasMany(Arte::class);
    }
    public function produccionTransito()
    {
        return $this->hasMany(ProduccionTransito::class);
    }

    public function filter()
    {
        return $this->hasMany(FilterProduccionTransito::class);
    }
    
    
    public function scopeFilterPivot($query, $tarea, $proveedor)
    {
       return $query
       ->when(count($tarea), function($query) use ($tarea)
       {
            $query->whereIn('tarea_id', $tarea);
       })
       ->when(count($proveedor), function($query) use ($proveedor)
       {
          $query->where('proveedor_id', $proveedor);
       });
      

       
    }
}
