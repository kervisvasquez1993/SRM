<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','rol_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function tareas()
    {
        return $this->hasMany(Tarea::class);
    }
    public function perfil()
    {
        return $this->hasOne(Perfil::class);
    }
    public function bocetos()
    {
        return $this->hasMany(Boceto::class);
    }

    public function validacionBocetos()
    {
        return $this->hasMany(ValidacionBoceto::class);
    }
    public function fichas()
    {
        return $this->hasMany(Ficha::class);
    }
    public function validacionFichas()
    {
        return $this->hasMany(ValidacionFicha::class);
    }
    public function confirmacionProveedores()
    {
        return $this->hasMany(ConfirmacionProveedor::class);
    }

    public function inicioProduccion()
    {
        return $this->hasMany(inicioProduccion::class);
    }

    public function pagosAnticipados()
    {
        return $this->hasMany(PagoAnticipado::class);
    }

    public function pagosBalance()
    {
        return $this->hasMany(PagoBalance::class);
    }

    public function finProducciones()
    {
        return $this->hasMany(FinProduccion::class);
    }

    public function transitoNacionalizaciones()
    {
        return $this->hasMany(TransitoNacionalizacion::class);
    }
}
