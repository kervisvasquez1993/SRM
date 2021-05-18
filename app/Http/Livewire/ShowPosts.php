<?php

namespace App\Http\Livewire;

use App\User;
use Livewire\Component;
use App\ProduccionTransito;
use App\PivotTareaProveeder;
use App\FilterProduccionTransito;
use Illuminate\Support\Facades\DB;

class ShowPosts extends Component
{

  
/*      public  $title; 
     public  $name; */
     
    /*  public function mount($name)
     {
         $this->name = $name;
     }
  */

    public $message;
    public $sort = 'id';
    public $orden = 'asc';
    public function render()
    {
        /* $produccion = ProduccionTransito::all(); */
      /*   $produccion = User::where('name', 'like', '%'.$this->message.'%')
                            ->orWhere('email', 'like', '%'.$this->message.'%')
                            ->orderBy($this->sort, $this->orden)
                            ->get(); */
        // consulta cruzada de enre dos tablas
        /* $produccion = ProduccionTransito::crossJoin('pivot_tarea_proveeders', 'produccion_transitos.pivot_tarea_proveeder_id', '=', 'pivot_tarea_proveeders.id')->get(); */
        

        /* Cláusulas de unión avanzadas */

        /* $produccion = DB::table('produccion_transitos')->join('pivot_tarea_proveeders', function($join)
        {
            $join->on('produccion_transitos.pivot_tarea_proveeder_id', '=', 'pivot_tarea_proveeders.id')->get();
        }); */

      /*  $produccion = DB::table('produccion_transitos')
        ->join('pivot_tarea_proveeders', function ($join) {
            $join->on('produccion_transitos.pivot_tarea_proveeder_id', '=', 'pivot_tarea_proveeders.id')
                 ->where('pivot_tarea_proveeders.iniciar_produccion', '=', 1);
        })
        ->get();  */
    


/*         $proveedores = ProduccionTransito::with(['pivotTable' => function($query){
            $query->where('iniciar_produccion', 1);
            
            $query->with(['proveedor' => function($query){
                $query->where('aprovado', 1);

                
                
            }]);
             
       }])
       ->get(); */     
       $proveedores = FilterProduccionTransito::width(
           
        
        
       )->get();
       
    /*    $proveedores = PivotTareaProveeder::FilterPivot([1], [0])->get(); */

        return view('livewire.show-posts', compact(('proveedores')))->layout('layouts.base');
    }

   /*  public function order($sort)
     {
            if($this->sort == $sort)
            {
                if($this->orden = 'asc')
                {
                    $this->orden = 'desc';
                }
                else
                {
                    $this->orden = 'asc';
                }
            }
            else
            {
                $this->sort = $sort;
                $this->orden = 'asc';

            }
     } */
}
