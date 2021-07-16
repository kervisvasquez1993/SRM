<?php

namespace App;

use App\Arte;
use App\Tarea;
use App\Proveedor;
use App\ProduccionTransito;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PivotTareaProveeder extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'compra_po',
        'payment_terms',
        'hs_code',
        'incoterms',
        'delivery_time',
        'codigo_comprador'
    ];

    public function compras()
    {
        return $this->hasMany(Compra::class);
    }

    public function productos()
     {
         return $this->hasMany(Producto::class);
     }
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

    public function arte()
    {
        return $this->hasOne(Arte::class);
    }
    
    public function produccionTransito()
    {
        return $this->hasMany(ProduccionTransito::class);
    }

   public function pivotFile()
   {
       return $this->hasMany(PivotFile::class);
   }
}
