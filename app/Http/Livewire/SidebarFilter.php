<?php

namespace App\Http\Livewire;

use App\User;
use App\Proveedor;
use Livewire\Component;

class SidebarFilter extends Component
{

    public $selected = [
        'proveedores' => [],
        'users' => [],

    ];
    public function render()
    {
        $proveedores = Proveedor::withCount(['filter'=> function($query){
            $query->WidtFilter(
              request()->input('proveedores', []),
              request()->input('users', []),
              request()->input('produccion_transito', []),
              request()->input('pivot_tarea_proveedor', []),
              
            );
        }])->get();

        $users = User::withCount(['filter'=> function($query){
            $query->WidtFilter(
              request()->input('proveedor', []),
              request()->input('user', []),
              request()->input('produccion_transito', []),
              request()->input('pivot_tarea_proveedor', []),
              request()->input('code_unit', [])
            );
      }])->get();
      


        return view('livewire.sidebar-filter',compact('users', 'proveedores'));
    }

    public function setSelected($selected)
    {
        $this->selected = $selected;
    }
}
