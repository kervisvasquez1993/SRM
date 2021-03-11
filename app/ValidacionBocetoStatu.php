<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ValidacionBocetoStatu extends Model
{
    public function arteEstatus()
    {
        return $this->hasMany(Arte::class);
    }
}
