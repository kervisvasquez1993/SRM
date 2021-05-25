@extends('admin.dashboar')

@section('content')
  @if (session('flash'))
    <div class="alert alert-success"  id="flash" role="alert">
        {{ session('flash') }}
    </div>
  @endif
  @php
      $array_tareas = [];
      $array_users  = [];
      $array_paises = [];
      foreach ($aprobados as $value):
            /* echo ($value->tarea->usuarios); */
            array_push($array_paises, strtoupper($value->proveedor->pais));
            array_push($array_tareas, strtoupper($value->tarea->nombre));
      endforeach;
      $array_unico_paises = array_unique($array_paises);
      $array_unico_tareas = array_unique($array_tareas);
  @endphp
    
    <div class="container">
      <div class="row">     

          <div  class="menu_iconos btn btn-sm" data-filter="all">
              Todos
          </div>     
          @foreach ($array_unico_paises as $item)
          <div  class="menu_iconos btn btn-sm" data-filter="{{$item}}">
              {{$item}}
          </div>
          @endforeach     
      </div>
    </div>
    <div class="container">
      <div class="row">       
          @foreach ($array_unico_tareas as $item)
          <div  class="menu_iconos btn btn-sm" data-filter="{{$item}}">
              {{$item}}
          </div>
          @endforeach     
      </div>
    </div>
<div class="filtro-container">
  @foreach($aprobados as $value)
    @if($value->proveedor->aprovado )  
           
          @if((Auth::user()->name == $value->tarea->usuarios->name) || Auth::user()->rol == 'coordinador')
          <div class="card filtr-item w-350" data-category="{{Str::upper($value->proveedor->pais)}}, {{Str::upper($value->tarea->nombre) }}">
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
                               <h4 class="p-4" id="id-proveedor{{$value->proveedor->id}}"><strong>País</strong>:  {{$value->proveedor->pais}}. </h4>
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
                          <div class="d-flex w-100  flex-wrap justify-content-between">
                            <h4 class="p-4" id=""><strong>Cantidad de Productos</strong>:  {{$value->proveedor->productos->count()}} </h4>
                            <h4 class="p-4" id=""><strong>total NW</strong>:  {{$value->proveedor->productos->sum('total_n_w')}}  </h4>
                            <h4 class="p-4" id=""><strong>total GW</strong>: {{$value->proveedor->productos->sum('total_g_w')}} </h4>
                            <h4 class="p-4" id=""><strong>total CBM</strong>:  {{$value->proveedor->productos->sum('total_cbm')}} </h4>
                            <h4 class="p-4" id=""><strong>total PCS</strong>:  {{$value->proveedor->productos->sum('corregido_total_pcs')}} </h4>
                            <h4 class="p-4" id=""><strong>total CTN</strong>:    {{$value->proveedor->productos->sum('total_ctn')}} </h4>
                          </div>
                   
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
              <button id="iniciarArte" data-id="{{$value->id}}" data-proveedor="{{$value->proveedor->id}}" class=" iniciarArte btn btn-sm btn-online-success btn-round">
                Iniciar Arte
              </button>
                
    
              <button data-id="{{$value->id}}"  data-proveedor="{{$value->proveedor->id}}" class="iniciarProduccion btn btn-sm btn-outline-success btn-round">
                Iniciar Produccion
              </button>   
              
              <button data-id="{{$value->id}}" data-proveedor="{{$value->proveedor->id}}" class="iniciarArteProduccion btn btn-sm btn-outline-success btn-round">
                Iniciar Arte y Producción
              </button>          
            @endif
            @endslot   
            @endcomponent
          </div>
          @endif
    @endif
  @endforeach
</div>
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
                                proveedorId = e.target.getAttribute('data-proveedor'),
                                nuevaUrl = `/${url}/${id}/${proveedorId}`
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

@push('scripts')
<script type="text/javascript" src="{{asset('assets/js/jquery.filterizr.min.js')}}"></script>
<script type="text/javascript">
 $(document).ready(function() 
 {
    if($('.filtro-container').length){
    $('.filtro-container').filterizr();
  }
 })  
</script>
@endpush