<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductOverview extends Model
{
    public function productos()
    {
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}
