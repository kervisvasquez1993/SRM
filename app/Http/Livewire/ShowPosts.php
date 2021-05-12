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
    public $sort = 'id';
    public $orden = 'asc';
    public function render()
    {
        /* $produccion = ProduccionTransito::all(); */
        $produccion = User::where('name', 'like', '%'.$this->message.'%')
                            ->orWhere('email', 'like', '%'.$this->message.'%')
                            ->orderBy($this->sort, $this->orden)
                            ->get();
        return view('livewire.show-posts', compact(('produccion')))->layout('layouts.base');
    }

    public function order($sort)
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
     }
}
