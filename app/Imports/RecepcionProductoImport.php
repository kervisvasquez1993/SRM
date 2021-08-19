<?php

namespace App\Imports;

use App\RecepcionProducto;
use App\RecepcionReclamoDevolucion;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class RecepcionProductoImport implements ToCollection, WithCalculatedFormulas
{
    public $recepcion;

    public function __construct(RecepcionReclamoDevolucion $recepcion)
    {
        $this->recepcion = $recepcion;
    }

    public function collection(Collection $rows)
    {
        $this->recepcion->fecha_recepcion_mercancia = Date::excelToDateTimeObject($rows[4][1]);
        $this->recepcion->hora_llegada_contenedor = Date::excelToDateTimeObject($rows[5][1]);
        $this->recepcion->hora_salida_contenedor = Date::excelToDateTimeObject($rows[6][1]);
        $this->recepcion->numero_precinto = $rows[7][1];

        $this->recepcion->numero_oc = $rows[4][7];
        $this->recepcion->numero_factura = $rows[5][7];
        $this->recepcion->comprador = $rows[6][7];
        $this->recepcion->importador = $rows[7][7];

        $this->recepcion->elaborado_por = $rows[4][17];
        $this->recepcion->verificado_por = $rows[5][17];
        $this->recepcion->aprobado_por = $rows[6][17];

        $this->recepcion->save();

        for ($i = 11; $i < count($rows); $i++) {
            $row = $rows[$i];

            $recepcionProducto =
                [
                'recepcion_reclamo_devolucion_id' => $this->recepcion->id,
                'codigo_sistema' => $row['0'],
                'descripcion' => $row['1'],
                'lote' => $row['2'],
                'vence' => Date::excelToDateTimeObject($row['3']),
                'total_recibido_en_unidades' => $row['4'],
                'u_m' => $row['5'],
                'cantidad_u_m' => $row['6'],
                'total_unidades_bulto' => $row['7'],
                'cantidad_empaque_intermedio' => ($row['8'] == 'N/A') ? 0 : $row['8'],
                'u_m_empaque_intermedio' => ($row['9'] == 'N/A') ? 0 : $row['9'],
                'unidades_en_bulto_resto' => ($row['10'] == 'N/A') ? 0 : $row['10'],
                'presentacion' => $row['11'],
                'referencia_catalogo' => $row['12'],
                'packing_u_m' => $row['13'],
                'packing_cantidad_u_m' => $row['14'],
                'packing_unidades_u_m' => $row['15'],
                'packing_total_unidad_spl' => $row['16'],
                'validacion' => $row['17'],
                'observaciones' => $row['18'],
            ];

            $validator = Validator::make($recepcionProducto, [
                'codigo_sistema' => 'required',
            ]);

            if ($validator->fails()) {
                continue;
            }

            RecepcionProducto::create($recepcionProducto);
        }
    }
}
