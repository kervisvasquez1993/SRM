@extends('admin.dashboar')
@section('content')

@foreach(Auth::user()->tareas as $tarea)
@component('componentes.cardGeneral')
    @slot('titulo')
        <span>{{$tarea->nombre}}</span> 
        <span>{{$tarea->proveedor->count()}} proveedores</span>
    @endslot

    @slot('bodyCard')
       {{$tarea->descripcion}}
    @endslot

    @slot('contenidoFooter')
      <div class="stats">
        <i class="material-icons">access_time</i> Finalización : {{ date('d-M-Y', strtotime($tarea->fecha_fin)) }}
      </div>
      <div>
        @if(Auth::user()->rol == 'comprador')
          <a href="#" type="button" 
                      class="btn btn-sm btn-outline-warning btn-round" 
                      data-id_tarea={{$tarea->id}}
                      data-toggle="modal" data-target="#abrirmodalEditar"
                  >
                 Agregar Empresa
          </a>
          @endif
      <a href="{{route('tareas.show', ['tarea' => $tarea->id])}}" class="btn btn-sm btn-outline-primary btn-round">Ver Detalle</a>
     </div>

    @endslot
@endcomponent
@endforeach



@component('componentes.formularioModalEdit')
  @slot('titleForm')
      <h4>Añadir Nueva Empresa</h4>
  @endslot
  @slot('route')
      {{route('proveedores.store')}}
  @endslot
  @slot('method')
      post
  @endslot

  @slot('BodyForm')
  
      <input type="hidden" id="id_tarea" name="id_tarea" value="">
      @include('inicio.form')
  @endslot
@endcomponent
  
@endsection
