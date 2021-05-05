@extends('admin.dashboar')

@section('content')
@if (session('flash'))
<div class="alert alert-success"  id="flash" role="alert">
    {{ session('flash') }}
</div>
@endif
@foreach($aprobados as $value)
@if($value->proveedor->aprovado )    
    @component('componentes.cardGeneral')
    @slot('titulo')
    <div> Nombre Empresa: {{$value->proveedor->nombre}}</div>  
    <div class="d-flex">
      @if(Auth::user()->rol == 'comprador')
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
         <div class="card-header d-flex justify-content-around flex-wrap">
          <h4><strong>País</strong>:  {{$value->proveedor->pais}}. </h4>
          <h4><strong>Ciudad</strong>: {{$value->proveedor->ciudad}}. </h4>
          <h4><strong>Distrito</strong>: {{$value->proveedor->distrito}}. </h4>
          <h4><strong>Porvincia</strong>: </h4>

      </div>
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
        <resumen-productos
            :cbm       = "{{json_encode($array_cbm)}}"
            :ctn       = "{{json_encode($array_ctn)}}"
            :total_cbm = "{{json_encode($array_total_cbm)}}"
            :total_n_w = "{{json_encode($array_total_n_w)}}"
            :total_g_w = "{{json_encode($array_total_g_w)}}"

        ></resumen-productos>
       
    
   

    @endslot

    @slot('contenidoFooter')
      {{-- <div id="eventInit" class="d-flex justify-content-between w-100"> --}}
        @if(Auth::user()->rol == 'coordinador')
          {{-- <form action="{{route('arteAprobados.update', ['arteAprobado' => $value->id])}}" method="post">
            @csrf
            @method('PUT')
            <input type="submit" value="Iniciar Arte" class="btn btn-sm btn-outline-success btn-round" >
          </form> --}}
          <button id="iniciarArte" data-id="{{$value->id}}" class=" iniciarArte btn btn-sm btn-online-success btn-round">
            Iniciar Arte
          </button>
        @endif
    
        @if(Auth::user()->rol == 'coordinador')
          <form action="{{route('produccionAprobados.update', ['produccionAprobado' => $value->id])}}" method="post">
            @csrf
            @method('PUT')
            <input type="submit" value="Iniciar Producción" class="btn btn-sm btn-outline-success btn-round">
          </form>
        @endif
        @if(Auth::user()->rol == 'coordinador')
          <form action="{{route('arteProduccionAprobados.update', ['arteProduccionAprobado' => $value->id])}}" method="post">
            @csrf
            @method('PUT')
            <input type="submit" value="Iniciar Producción y Artes" class="btn btn-sm btn-outline-success btn-round" >
          </form>
        @endif
      {{-- </div> --}}
    @endslot
 @endcomponent

@endif
    
  
@endforeach

 @endsection
@push('scripts')
    <script>
        let iniciarArte = document.getElementById('eventInit'),
            csrfToken = document.head.querySelector("[name~=csrf-token][content]").content; 
            iniciarArte.addEventListener('click', e =>
                  {
                      let arte = e.target.classList.contains('iniciarArte')
                       if(arte)
                       {       
                       
                            id     = e.target.getAttribute('data-id'),
                            console.log(id)
                            url = `/produccionAprobados/${id}`
                        
                        actualizarRuta(url)
                                  
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