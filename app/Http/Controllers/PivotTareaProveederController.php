<?php

namespace App\Http\Controllers;

use App\Arte;
use Carbon\Carbon;
use App\ProduccionTransito;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use App\FilterProduccionTransito;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Facades\Auth;

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


     public function arteProduccionAprobado($id, $proveedorId)
     {
        
         
        $pivot = PivotTareaProveeder::where('id', $id)->update( array( 'iniciar_produccion' => 1, 'iniciar_arte' => 1 ));
        $this->artes($id);
        $this->iniciarProduccion($id);    
        $produccionTransito =  $this->iniciarProduccion($id); 
        $this->filterProduccionTransito($id, $proveedorId,$produccionTransito);

        return response()->json("Datos Actualizado");
     }

     public function filterProduccionTransito($id,$proveedorId, $produccionTransito)
     {
        $filterProduccionTransito = FilterProduccionTransito::where('pivot_tarea_proveedor_id', $id)->get(); 
        if(sizeof($filterProduccionTransito))
        {
            return "Ya existe el Proveedor Filtro";
        }
        else{
            $filterProduccionTransito = new FilterProduccionTransito(); 
            $filterProduccionTransito->user_id = Auth::user()->id;
            $filterProduccionTransito->proveedor_id = $proveedorId;
            $filterProduccionTransito->pivot_tarea_proveedor_id = PivotTareaProveeder::where('id', $id)->get()[0]->id;
            $filterProduccionTransito->produccion_transitos_id = $produccionTransito;
            $filterProduccionTransito->save();
            return $filterProduccionTransito;
        }
        
       
         
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
            return $produccionAprobar[0]->id;
        }
        else
        {
            $produccionAprobar = new ProduccionTransito();
            $produccionAprobar->pivot_tarea_proveeder_id = $id;
            $produccionAprobar->save();
        }

        return $produccionAprobar->id;
     }

    
    

  
   


}