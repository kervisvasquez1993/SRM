<?php

namespace App\Imports;

use App\RecepcionProducto;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Facades\Validator;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;

class RecepcionProductoImport implements ToModel, WithStartRow , WithCalculatedFormulas
{
    
    
    public $pivot_id;   
    public function __construct($pivot_id)
    {
        $this->pivot_id = $pivot_id; 
    }
    public function model(array $row)
    {
        $recepcionProducto = 
        [
            
            'recepcion_reclamo_devolucion_id' => $this->pivot_id,
            'codigo_sistema'                  =>$row['0'] ,
            'descripcion'                     =>$row['1'] ,
            'lote'                            =>$row['2'] ,
            'vence'                           => Date::excelToDateTimeObject($row['3']),
             'total_recibido_en_unidades'      =>$row['4'] ,
            'u_m'                             =>$row['5'] ,
            'cantidad_u_m'                    =>$row['6'] ,
            'total_unidades_bulto'            =>$row['7'] ,
            'cantidad_empaque_intermedio'     =>($row['8'] == 'N/A') ?   0 :  $row['8'] ,
            'u_m_empaque_intermedio'          =>($row['9'] == 'N/A') ?   0 :  $row['9'] ,
            'unidades_en_bulto_resto'         =>($row['10'] == 'N/A') ?  0 :  $row['10'] ,
            'presentacion'                    =>$row['11'],
            'referencia_catalogo'             =>$row['12'],
            'packing_u_m'                     =>$row['13'],
            'packing_cantidad_u_m'            =>$row['14'],
            'packing_unidades_u_m'            =>$row['15'],
            'packing_total_unidad_spl'        =>$row['16'],
            'validacion'                      =>$row['17'],
            'observaciones'                   =>$row['18']
        ];

         $validator = Validator::make($recepcionProducto, [
            
            'codigo_sistema' => 'required',
                
        ]);

       
        if ($validator->fails())
        {
            return null;
            
        }
        
        

        return new RecepcionProducto($recepcionProducto);
    }
    public function startRow(): int
    {
        return 13;
    }
}
