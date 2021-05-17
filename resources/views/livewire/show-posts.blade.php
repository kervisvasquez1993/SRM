<div>
    <h4>Lista de Produccion trasito </h4> 
    
    <div class="m-4">
        <div class="d-flex">
            <input wire:model="message" type="text">
            {{-- <h1>{{ $message }}</h1> --}}
            @livewire('create-post')
        </div>

       @foreach($proveedores as $key )
         <br>  
          {{$key}}
         <br>
         <br>
       
       @endforeach 
      {{-- @if($proveedores->count())
        <table class="table">
            <thead>
               <tr>
                <th wire:click="order('id')" scope="col">Id</th>
                <th wire:click="order('id')" scope="col">pivot_tarea_proveeder_id</th>
                <th wire:click="order('id')" scope="col">pagos_anticipados</th>
                 <th wire:click="order('rol')" scope="col">inicio_produccion</th>
                 <th wire:click="order('name')" scope="col">fin_produccion</th>
                 <th wire:click="order('email')" scope="col">transito_nacionalizacion</th>
                 <th wire:click="order('email')" scope="col">fin_produccion_transito</th>
                 <th wire:click="order('email')" scope="col">salida_puero_origen</th>
               </tr>
            </thead> 
             @foreach($proveedores as $producto)
                <tbody>
                  
                      {{json_encode($producto)}};
                      <br>
                      <br>
                  
                 {{--  <tr>
                    <th scope="row">{{$producto->id}}</th>
                    <th scope="row">{{$producto->pivot_tarea_proveeder_id}}</th>
                    <td>{{$producto->pagos_anticipados}}</td>
                    <td>{{$producto->fin_produccion}}</td>
                    <td>{{$producto->pago_balance}}</td>
                    <td>{{$producto->transito_nacionalizacion}}</td>
                    <td>{{$producto->fin_produccion_transito}}</td>
                    <td>{{$producto->salida_puero_origen}}</td>
                    
                  </tr> --}}
               
    </div>
</div>
