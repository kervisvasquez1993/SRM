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

      <a href="{{ route('productos.index') }}" type="button" class="btn btn-sm btn-success">Agregar Productos</a>          
    
     </div>
    @endslot
    @slot('bodyCard')
    <h6 class="font-weight-bold">Pais: {{$value->proveedor->pais}} , Ciudad: {{$value->proveedor->ciudad}} , Distrito: {{$value->proveedor->distrito}} </h6>
    <div>
      <p>
        @foreach($value->proveedor->productos as $productos)
            {{$productos}}
        @endforeach
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