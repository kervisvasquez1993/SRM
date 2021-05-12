<?php

namespace App\Http\Livewire;

use Livewire\Component;

class ShowPosts extends Component
{

  
     public  $title; 
     public  $name;
     
     public function mount($name)
     {
         $this->name = $name;
     }
 
    public function render()
    {
        return view('livewire.show-posts')->layout('layouts.base');
    }
}
