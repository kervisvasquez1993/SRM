@extends('admin.dashboar')
@section('content')

<div class="content">
<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
          <div class="row">
              @foreach($noAprovado as $proveedor)
                 {{-- <h3>Nombre del Proveedor:  {{$proveedor->nombre}}</h3> --}}
           
                 @component('componentes.cardGeneral')
                    @slot('titulo')
                    Nombre Empresa: {{$proveedor->nombre}}                        
                    @endslot
                    @slot('bodyCard')
                    <h6 class="font-weight-bold">Pais: {{$proveedor->pais}}, Ciudad: {{$proveedor->ciudad}}, Distrito: {{$proveedor->distrito}} </h6>
                    <div>
                      <p>
                        {{$proveedor->descripcion}}
                      </p>
                    </div>
                   

                    @endslot

                    @slot('contenidoFooter')
                             
                             <p class="font-weight-bold">Status:   {{$proveedor->aprovado == 0 ? "Sin Aprovar" : "Aprovado"}}</p>
                            <p class="font-weight-bold">Direccion: {{$proveedor->address}}</p>
                            <p class="font-weight-bold">Teléfono: {{$proveedor->telefono}}</p>
                            <p class="font-weight-bold">Contacto: {{$proveedor->contacto}}</p>
                            <p class="font-weight-bold">email: {{$proveedor->email}}</p>
                            <p class="font-weight-bold">Contacto: {{$proveedor->contacto}}</p>
                        
                    @endslot
                 @endcomponent
                 

                 
              @endforeach
             
           
            
            
          </div>
        </div>
    
    </div>
  </div>

  
@endsection