<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RecepcionProducto extends Model
{
    use SoftDeletes;
    private $fillable = 
    [
         'recepcion_reclamo_devolucion_id',
         'codigo_sistema',
         'descripcion',
         'lote',
         'vence',
         'total_recibido_en_unidades',
         'u_m',
         'cantidad_u_m',
         'total_unidades_bulto',
         'cantidad_empaque_intermedio',
         'u_m_empaque_intermedio',
         'unidades_en_bulto_resto',
         'presentacion',
         'referencia_catalogo',
         'packing_u_m',
         'packing_cantidad_u_m',
         'packing_unidades_u_m',
         'packing_total_unidad_spl',
         'validacion',
         'observaciones',    
    ];

    public function RecepcionReclamoDevolucion()
    {
        return $this->belongsTo(RecepcionReclamoDevolucion::class,'recepcion_reclamo_devolucion_id');
    }
}
