<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductOverview extends Model
{
    use SoftDeletes;
    public function productos()
    {
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}
