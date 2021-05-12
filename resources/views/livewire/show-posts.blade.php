<div>
    <h4>Lista de Produccion trasito </h4> 
    
    <div class="m-4">
        <input wire:model="message" type="text">
      {{-- <h1>{{ $message }}</h1> --}}
      @if($produccion->count())
        <table class="table">
            <thead>
               <tr>
                 <th wire:click="order('id')" scope="col">id</th>
                 <th wire:click="order('rol')" scope="col">Rol</th>
                 <th wire:click="order('name')" scope="col">Nombre</th>
                 <th wire:click="order('email')" scope="col">Email</th>
               </tr>
            </thead> 
            @foreach($produccion as $producto)
                <tbody>
                  <tr>
                    <th scope="row">{{$producto->id}}</th>
                    <td>{{$producto->rol}}</td>
                    <td>{{$producto->name}}</td>
                    <td>{{$producto->email}}</td>
                  </tr>
                </tbody>
            @endforeach
          </table>
           @else
           <div> No existe reultado de busqueda asociado a <span class="font-weight-bold">{{$message}}</span></div>
        @endif
    </div>
</div>
