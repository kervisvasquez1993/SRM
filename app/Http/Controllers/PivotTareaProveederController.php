<?php

namespace App\Http\Controllers;

use App\Arte;
use Carbon\Carbon;
use App\ProduccionTransito;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Relations\Pivot;

class PivotTareaProveederController extends Controller
{
    
  
     public function arteAprobado($id)
     {
         $pivot = PivotTareaProveeder::findOrFail($id);
         return response()->json($this->artes($pivot->id));

     }

     public function produccionAprobado($id)
     {
        $pivot = PivotTareaProveeder::where('id', $id)->update(array('iniciar_produccion' => 1));
        return response()->json($this->iniciarProduccion($id));
     }


     public function arteProduccionAprobado($id)
     {
        $pivot = PivotTareaProveeder::where('id', $id)->update( array( 'iniciar_produccion' => 1, 'iniciar_arte' => 1 ));
        $this->artes($id);
        $this->iniciarProduccion($id);    
        return response()->json("Datos Actualizado");
     }


     public function artes($id)
     {
       
        $arteTrue = Arte::where('pivot_tarea_proveeder_id', $id)->get();
        
        if(sizeof($arteTrue))
        {
            return "Ya existe el Proveedor en Arte";
        }
        else
        {
            $arte = new Arte();
            $arte->pivot_tarea_proveeder_id = $id;
            $arte->nombre = 'Esto es una Prueba';
            $arte->creacion_fichas = 1;
            $arte->validacion_fichas = 1;
            $arte->creacion_boceto =  1;
            $arte->validacion_boceto = 1;
            $arte->confirmacion_proveedor = 1;
            $arte->fecha_fin = Carbon::now(); /* //TODO cambiar el metodo de carbon por fecha de finalizacion recibida de request */
            $arte->save();
            return $arte;
        }
        
     }

     public function iniciarProduccion($id)
     {
        $produccionAprobar = ProduccionTransito::where('pivot_tarea_proveeder_id', $id)->get();
        if(sizeof($produccionAprobar)){
            return "Ya existe el Produccion";
        }
        else
        {
            $produccionAprobar = new ProduccionTransito();
            $produccionAprobar->pivot_tarea_proveeder_id = $id;
            $produccionAprobar->save();
        }

        return $produccionAprobar;
     }

    
    

  
   


}