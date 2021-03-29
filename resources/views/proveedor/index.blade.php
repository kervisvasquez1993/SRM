@extends('admin.dashboar')

@section('content')

@foreach($aprobados as $value)
@if($value->proveedor->aprovado )    
  
  {{--   <div>{{$value->proveedor}}</div> 
    <div>{{$value->tarea->nombre}}</div>
    <div>{{$value->tarea->usuarios->name}}</div> --}}
    



    @component('componentes.cardGeneral')
    @slot('titulo')
    <div> Nombre Empresa: {{$value->proveedor->nombre}}</div>  
    <div class="d-flex">
        <form action="" method="post">
            @csrf
            @method('PUT')
            <input type="hidden" name="aprovado" value="1" >
            <input type="hidden" name="name" value="" >
            <input type="submit" value="agregar Productos" class="btn btn-sm  btn-success" >
          </form>
            
    
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