<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BocetoStatu extends Model
{
    public function arteEstatus()
    {
        return $this->hasMany(Arte::class);
    }
}
