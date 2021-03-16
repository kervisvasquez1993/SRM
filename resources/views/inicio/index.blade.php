@extends('admin.dashboar')
@section('content')

@foreach(Auth::user()->tareas as $tarea)
@component('componentes.cardGeneral')
    @slot('titulo')
        <span>{{$tarea->nombre}}</span> 
    @endslot

    @slot('bodyCard')
       {{$tarea->descripcion}}
    @endslot

    @slot('contenidoFooter')
      <p class="category">{{$tarea->fecha_fin}}</p>
      
    @endslot
@endcomponent
@endforeach




  
@endsection
