<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConfirmacionProveedorStatus extends Model
{use SoftDeletes;

    public function arteEstatus()
    {
        return $this->hasMany(Arte::class);
    }
}
