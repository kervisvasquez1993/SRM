<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\FilterProduccionTransito;

class Proveedor extends Component
{

    protected $selected = [
        'proveedores' => [],
        'users' => [],
        'produccion_transito' => [],
        'pivot_tarea_proveedor' => [],
        'code_unit' => []
    ];
    protected $listeners = ['updateSidebarFilter' => 'setSelected'];
    public function render()
    {
        
        $proveedores = FilterProduccionTransito::WidtFilter(
            request()->input('proveedores', []),
            request()->input('users', []),
            request()->input('produccion_transito', []),
            request()->input('pivot_tarea_proveedor', []),
            request()->input('code_unit', [])
          )->with('proveedor')->with('produccionTransito')->get();  
        
        return view('livewire.proveedor', compact('proveedores'));
    }

    public function setSelected($selected)
    {
        $this->selected = $selected;
    }
}
