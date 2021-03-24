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
          <a href="#" type="button" 
                      class="btn btn-primary btn-sm" 
                      data-id_tarea={{$tarea->id}}
                      data-toggle="modal" data-target="#abrirmodalEditar"
                  >
                 Agregar Empresa
          </a>
      <a href="{{route('tareas.show', ['tarea' => $tarea->id])}}" class="btn btn-success btn-sm ">Ver Detalle</a>
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
