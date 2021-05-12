<?php

namespace App\Http\Livewire;
use App\ProduccionTransito;
use Livewire\Component;

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
    public function render()
    {
        $produccion = ProduccionTransito::all();
        return view('livewire.show-posts', compact(('produccion')))->layout('layouts.base');
    }
}
