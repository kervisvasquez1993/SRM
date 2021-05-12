<?php

namespace App\Http\Livewire;
use App\ProduccionTransito;
use App\User;
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
        /* $produccion = ProduccionTransito::all(); */
        $produccion = User::where('name', 'like', '%'.$this->message.'%')
                            ->orWhere('email', 'like', '%'.$this->message.'%')
                            ->get();
        return view('livewire.show-posts', compact(('produccion')))->layout('layouts.base');
    }
}
