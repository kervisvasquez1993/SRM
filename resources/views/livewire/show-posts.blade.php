<div>
    <h4>Lista de Produccion trasito </h4> 
    
    <div class="m-4">
        <input wire:model="message" type="text">

      <h1>{{ $message }}</h1>
        @foreach($produccion as $producto)
            <div>    
               {{$producto}}
            </div>
        @endforeach
    </div>
</div>
