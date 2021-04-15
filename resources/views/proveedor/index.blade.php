@extends('admin.dashboar')

@section('content')
@if (session('flash'))
<div class="alert alert-success"  id="flash" role="alert">
    {{ session('flash') }}
</div>
@endif
@foreach($aprobados as $value)
@if($value->proveedor->aprovado )    
  
  {{--   <div>{{$value->proveedor}}</div> 
    <div>{{$value->tarea->nombre}}</div>
    <div>{{$value->tarea->usuarios->name}}</div> --}}
    

  

    @component('componentes.cardGeneral')
    @slot('titulo')
    <div> Nombre Empresa: {{$value->proveedor->nombre}}</div>  
    <div class="d-flex">

      <a href="{{ route('productos.index', ['id_proveedor' => $value->proveedor->id]) }}" type="button" class="btn btn-sm btn-outline-success btn-round">Agregar Productos</a>          
    
     </div>
    @endslot
    @slot('bodyCard')
    <h6 class="font-weight-bold">Pais: {{$value->proveedor->pais}} , Ciudad: {{$value->proveedor->ciudad}} , Distrito: {{$value->proveedor->distrito}} </h6>
    <div>
      @php
          $array_pcs       = array();
          $array_cbm       = array();
          $array_ctn       = array();
          $array_total_cbm = array();
          $array_total_n_w = array();
          $array_total_g_w = array();
      @endphp
        @foreach($value->proveedor->productos as $productos)
              <div>
                  @php
                      array_push($array_pcs, $productos->total_pcs);
                      array_push($array_cbm, $productos->cbm);
                      array_push($array_ctn, $productos->total_ctn);
                      array_push($array_total_cbm, $productos->total_cbm);
                      array_push($array_total_n_w, $productos->total_n_w);
                      array_push($array_total_g_w, $productos->total_g_w);
                  @endphp          
        @endforeach
      
      
        <br>
        @json($array_cbm)
        <br>
        @json($array_ctn)
        <br>
        @json($array_total_cbm)
        <br>
        @json($array_total_n_w)
        <br>
        @json($array_total_g_w)

        <resumen-productos
            
        ></resumen-productos>

    

        


       
      </p>
    </div>
   

    @endslot

    @slot('contenidoFooter')
      <form action="{{route('arteAprobados.update', ['arteAprobado' => $value->id])}}" method="post">
        @csrf
        @method('PUT')
        <input type="submit" value="Iniciar Arte" class="btn btn-sm  btn-secondary" >
    </form>


    <form action="{{route('produccionAprobados.update', ['produccionAprobado' => $value->id])}}" method="post">
      @csrf
      @method('PUT')
      <input type="submit" value="Iniciar Producción" class="btn btn-sm  btn-warning">
    </form>

    <form action="{{route('arteProduccionAprobados.update', ['arteProduccionAprobado' => $value->id])}}" method="post">
      @csrf
      @method('PUT')
      <input type="submit" value="Iniciar Producción y Artes" class="btn btn-sm  btn-success" >
    </form>
        
    @endslot
 @endcomponent

@endif
    
    <br>
    <br>
   
    <br>
@endforeach

 @endsection
{{--  --}}