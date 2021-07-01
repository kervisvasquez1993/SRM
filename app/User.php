<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{

    use SoftDeletes;
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }


    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'rol', 'email', 'password', 'device_key'
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

    public function recepcionMercancias()
    {
        return $this->hasMany(RecepcionMercancia::class);
    }

    public function inspeccionCargas()
    {
        return $this->hasMany(InspeccionCarga::class);
    }

    public function reclamosDevolucione()
    {
        return $this->hasMany(ReclamosDevolucione::class);
    }

    public function filter()
    {
        return $this->hasMany(FilterProduccionTransito::class);
    }
}
