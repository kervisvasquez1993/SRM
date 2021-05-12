@extends('admin.dashboar')

@section('content')
@if (session('flash'))
<div class="alert alert-success"  id="flash" role="alert">
    {{ session('flash') }}
</div>
@endif
@foreach($aprobados as $value)
@if($value->proveedor->aprovado )    
  @if((Auth::user()->name == $value->tarea->usuarios->name) || Auth::user()->rol == 'coordinador')
    @component('componentes.cardGeneral')
    @slot('titulo')
    <div> Empresa: {{$value->proveedor->nombre}}</div>  
    <div> Tarea: {{$value->tarea->nombre}}</div>
    <div> Comprador: {{$value->tarea->usuarios->name}}</div>
    
    <div class="d-flex">
      @if(Auth::user()->rol == 'comprador' || Auth::user()->rol == 'coordinador')
      <a href="{{ route('productos.index', ['id_proveedor' => $value->proveedor->id]) }}" type="button" class="btn btn-sm btn-outline-warning btn-round">Agregar Productos</a> 
      
      @if($value->proveedor->compra->count() >= 1)
      <a  href="{{ route('compras.edit', [ 'compra' =>$value->proveedor->compra[0]->id] ) }}"  type="button" class="btn btn-sm btn-outline-warning btn-round">Editar Orden de Compra</a>  
      @else
      <a href="{{ route('compras.create', ['id_proveedor' => $value->proveedor->id] ) }}" type="button" class="btn btn-sm btn-outline-warning btn-round">Agregar Orden de Compra</a>          
      @endif
      @endif 
     </div>
              
    @endslot
    @slot('bodyCard')   
        @php
            $array_pcs       = array();
            $array_cbm       = array();
            $array_ctn       = array();
            $array_total_cbm = array();
            $array_total_n_w = array();
            $array_total_g_w = array();
        @endphp
        @foreach($value->proveedor->productos as $productos)
              
                  @php
                      array_push($array_pcs, $productos->total_pcs);
                      array_push($array_cbm, $productos->cbm);
                      array_push($array_ctn, $productos->total_ctn);
                      array_push($array_total_cbm, $productos->total_cbm);
                      array_push($array_total_n_w, $productos->total_n_w);
                      array_push($array_total_g_w, $productos->total_g_w);
                  @endphp          
        @endforeach
       <div>
        <div class="card-header card-header-tabs">        
          <ul class="nav" data-tabs="tabs">
          <li class="btn btn-sm ">
            
            <a class="nav-link   active show" href="#profile-{{$value->id}}" data-toggle="tab">
              <span class="material-icons">
                business
                </span> Detalle de Proveedor
              <div class="ripple-container"></div>
            <div class="ripple-container"></div></a>
          </li>
          <li class="btn  btn-sm d-block">
            <a class="nav-link" href="#messages-{{$value->id}}" data-toggle="tab">
              <i class="material-icons">info</i> Detalles de Productos
              <div class="ripple-container"></div>
            <div class="ripple-container"></div></a>
          </li>
          <li class="btn  btn-sm d-block">
            <a class="nav-link" href="#settings-{{$value->id}}" data-toggle="tab">
              <i class="material-icons">shopping_cart</i> Detalle De Compra
              <div class="ripple-container"></div>
            <div class="ripple-container"></div></a>
          </li>
        </ul>  
        </div>
        <div class="card-body">
          <div class="tab-content">
          <div class="tab-pane active show" id="profile-{{$value->id}}">
            <table class="table">
              <div class="d-flex w-100  flex-wrap justify-content-between">
                   <h4 class="p-4"><strong>País</strong>:  {{$value->proveedor->pais}}. </h4>
                   <h4 class="p-4"><strong>Ciudad</strong>: {{$value->proveedor->ciudad}}. </h4>
                   <h4 class="p-4"><strong>Distrito</strong>: {{$value->proveedor->distrito}}. </h4>
                   <h4 class="p-4"><strong>Descripcion</strong>: {{$value->proveedor->descripcion}}. </h4>
                   <h4 class="p-4"><strong>Direccion</strong>: {{$value->proveedor->address}}. </h4>
                   <h4 class="p-4"><strong>Contacto</strong>: {{$value->proveedor->contacto}}. </h4>
                   <h4 class="p-4"><strong>Teléfono</strong>: {{$value->proveedor->telefono}}. </h4>
                   <h4 class="p-4"><strong>Email</strong>: {{$value->proveedor->email}}. </h4>
                   
              </div>
            </table>
          </div>
          <div class="tab-pane" id="messages-{{$value->id}}">
            <table class="table">
              <resumen-productos
                :cbm       = "{{json_encode($array_cbm)}}"
                :ctn       = "{{json_encode($array_ctn)}}"
                :total_cbm = "{{json_encode($array_total_cbm)}}"
                :total_n_w = "{{json_encode($array_total_n_w)}}"
                :total_g_w = "{{json_encode($array_total_g_w)}}"
              ></resumen-productos>
            </table>
          </div>
          <div class="tab-pane" id="settings-{{$value->id}}">
            <table class="table">
                
                @foreach($value->proveedor->compra as $key)
                  <div class="d-flex w-100  justify-content-between">
                    <h5 class="p-3"><strong>Orden de Compra</strong>: {{$key->orden_compra}}</h5>
                    <h5 class="p-3"><strong>Item</strong>: {{$key->item }} </h5>
                    <h5 class="p-3"><strong>Registro Salud</strong>: {{$key->registro_salud}}</h5>
                    <h5 class="p-3"><strong>Cantidad PCS</strong>: {{$key->cantidad_pcs}} </h5>
                    <h5 class="p-3"><strong>Descripción</strong>:  {{$key->descripcion}}</h5>
                    <h5 class="p-3"><strong>Total</strong>:  {{$key->total}}</h5>  

                  </div>
                @endforeach
                 
          
            </table>
          </div>
          </div>
        </div>
      </div>
    @endslot
    @slot('contenidoFooter')
    @if(Auth::user()->rol == 'coordinador')
          <button id="iniciarArte" data-id="{{$value->id}}" class=" iniciarArte btn btn-sm btn-online-success btn-round">
            Iniciar Arte
          </button>
            

          <button data-id="{{$value->id}}" class="iniciarProduccion btn btn-sm btn-outline-success btn-round">
            Iniciar Produccion
          </button>   
          
          <button data-id="{{$value->id}}" class="iniciarArteProduccion btn btn-sm btn-outline-success btn-round">
            Iniciar Arte y Producción
          </button>          
      {{-- </div> --}}
      @endif
      @endslot   
    @endcomponent
  @endif

@endif
    
  
@endforeach

 @endsection
@push('scripts')
    <script>
        let iniciarArte = document.getElementById('eventInit'),
            csrfToken = document.head.querySelector("[name~=csrf-token][content]").content; 
            iniciarArte.addEventListener('click', e =>
                  {
                      let arte           = e.target.classList.contains('iniciarArte'),
                          produccion     = e.target.classList.contains('iniciarProduccion'),
                          arteProduccion = e.target.classList.contains('iniciarArteProduccion') 
                       
                        function initUrl(url)
                        {
                            let id  = e.target.getAttribute('data-id'),
                                nuevaUrl = `/${url}/${id}`
                                actualizarRuta(nuevaUrl)
                        }
                       
                       if(arte)
                       {       
                          initUrl('arteAprobados')           
                       }

                       if(produccion)
                       {
                         initUrl('produccionAprobados') 
                       }

                       if(arteProduccion)
                       {
                         initUrl('arteProduccionAprobados')    
                       }
                  })





          function actualizarRuta(url)
          {
            fetch(url,{
                  method: 'PUT',
                  headers:{
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': csrfToken
                          }
                            }).then(response => response.json()).then( data => { console.log(data)})
          }
                        
    </script>

@endpush