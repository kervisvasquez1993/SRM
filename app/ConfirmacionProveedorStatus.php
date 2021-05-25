<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ConfirmacionProveedorStatus extends Model
{
    public function arteEstatus()
    {
        return $this->hasMany(Arte::class);
    }
}
