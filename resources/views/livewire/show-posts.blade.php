<div>
    <h4>Lista de Produccion trasito </h4> 
    
    <div class="m-4">
        <input wire:model="message" type="text">
      {{-- <h1>{{ $message }}</h1> --}}
      @if($produccion->count())
           @foreach($produccion as $producto)
               <div>    
                  {{$producto}}
               </div>
           @endforeach
           @else
           <div> No existe reultado de busqueda asociado a <span class="font-weight-bold">{{$message}}</span></div>
        @endif
    </div>
</div>
