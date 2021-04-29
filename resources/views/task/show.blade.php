@extends('admin.dashboar')
@section('content')
@php
$fecha_asignada   = $date::parse(date('d-M-Y', strtotime($tarea->fecha_fin)));
if($fecha_asignada > $date::now())
{
  $fecha_restantes  = $fecha_asignada->diffInDays($date::now());
}
else
{
  $fecha_restantes  = 0; 
}
$dias_creacion    = $date::parse(date('d-M-Y', strtotime($tarea->created_at)));
$dias_totales     =  $fecha_asignada->diffInDays($dias_creacion);
if($dias_totales == 0)
{
   $porcentaje = 100;
}
else 
{
  $porcentaje =  round(($fecha_restantes * 100) / $dias_totales);   
}
@endphp

<div class="content">
  @if (session('aprobado'))
  <div class="alert alert-success" role="alert">
      {{ session('aprobado') }}
  </div>
 @endif
<div class="container-fluid">
    <div class="row">
      <div class="container-fluid d-flex justify-content-between">
        <div>
            @if(Auth::user()->rol == 'comprador')
                 <a href="#" type="button" 
                 class="btn btn-sm btn-outline-primary btn-round" 
                 data-id_tarea={{$tarea->id}}
                 data-toggle="modal" data-target="#abrirmodalEditar"
                  >
                     Agregar Empresa
                 </a>
            @endif
             <a href="{{route('proveedor-negociacion')}}" type="button" 
             class="btn btn-sm btn-outline-primary btn-round" 
              >
                 <span class="font-weight-bold">
                     Empresas en Negociacion {{$aprovado->count()}}
                 </span>
             </a>  
        </div>  

        @include('ui.previous')
      </div>
        
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
          
                <div class="row">
                  <div class="col-md-6 ml-auto mr-auto text-center">
                    <h4 class="card-title">
                      Detalles
                    </h4>
                  </div>
                </div>
                <div class="row d-flex justify-content-between flex-wrap">
                  
                      <p class="badge badge-success text-wrap">
                        Nombre de Tarea : {{$tarea->nombre}}
                      </p>

                      <p class="badge badge-success text-wrap">
                        Fecha de Finalizacion : {{ date('d-M-Y', strtotime($tarea->fecha_fin))}} 
                      </p>

                      <p class="badge badge-success text-wrap">
                        Días Totales : {{$dias_totales}} Días
                      </p>
                      <p class="badge badge-success text-wrap">
                        Días Restante : {{$fecha_restantes}} Días restante
                      </p>
                      <p class="badge badge-success text-wrap">
                        Finalizacion : {{$porcentaje}} %
                      </p>
                  
                </div>
                 
              </div>
            </div>
             {{$tarea->descripcion}}
           

             <div class="empresas-titulo">
               <h4>Empresas asociadas a la Tarea</h4>

             </div>
              @foreach($noAprovado as $proveedor)
                 {{-- <h3>Nombre del Proveedor:  {{$proveedor->nombre}}</h3> --}}
           
                 @component('componentes.cardGeneral')
                    @slot('titulo')
                    <div> Nombre Empresa: {{$proveedor->nombre}}</div>  
                    <div class="d-flex">
                      @if(Auth::user()->rol == 'coordinador')
                          <form action="{{route('negociaciones.update', ['negociar' => $proveedor->id])}}" method="post">
                            @csrf
                            @method('PUT')
                            <input type="hidden" name="aprovado" value="1" >
                            <input type="hidden" name="name" value="{{$proveedor->id}}" >
                            <input type="submit" value="Negociar" class="btn btn-sm btn-outline-primary btn-round">
                          </form>
                      @endif
                      {{-- //TODO: CAMBIAR LA FUNCIONALIDAD PARA QUE SE ENVIA POR JS Y NO POR UN FORMULARIO --}}
                      @if(Auth::user()->rol == 'comprador')
                          <a href="#" type="button" 
                                    class="btn btn-sm btn-outline-primary btn-round"  
                                    data-id_tarea="{{$proveedor->id}}"
                                    data-tarea="{{$proveedor->nombre}}"
                                    data-pais="{{$proveedor->pais}}"
                                    data-ciudad="{{$proveedor->ciudad}}"
                                    data-distrito="{{$proveedor->distrito}}"
                                    data-direccion="{{$proveedor->direccion}}"
                                    data-contactos="{{$proveedor->contacto}}"
                                    data-telefonos="{{$proveedor->telefono}}"
                                    data-email="{{$proveedor->email}}"
                                    data-descripcion="{{$proveedor->descripcion}}"
                                    data-toggle="modal"
                                    data-target="#abrirmodalEditarProveedor">
                            <span class="material-icons">
                              edit
                            </span>
                             Editar
                          </a>
                      @endif
                  </div>
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
                            <p class="font-weight-bold">Direccion:  {{$proveedor->address}}</p>
                            <p class="font-weight-bold">Teléfono:   {{$proveedor->telefono}}</p>
                            <p class="font-weight-bold">Contacto:   {{$proveedor->contacto}}</p>
                            <p class="font-weight-bold">email:      {{$proveedor->email}}</p>
                            <p class="font-weight-bold">Contacto:   {{$proveedor->contacto}}</p>
                        
                    @endslot
                 @endcomponent
                 

                 
              @endforeach
             
           
            
            
          </div>
        </div>
      </div>
  </div>
 <!--Inicio del modal actualizar-->
</div>

<div class="modal fade" id="abrirmodalEditarProveedor" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true">
  <div class="modal-dialog modal-primary modal-lg" role="document">
      <div class="modal-content">
          <div class="modal-header">
              <h4 class="modal-title">Actualizar Tareas </h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
          </div>
          <div class="modal-body">
               <form action="" method="post" class="form-horizontal">
                  {{csrf_field()}}
                  <input type="hidden" id="id_tarea" name="id_tarea" value="">
                  @include('inicio.form')

              </form>
          </div>
          
      </div>
      <!-- /.modal-content -->
  </div>
</div>
  
@endsection
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

@section('css')

  <style>
    .empresas-titulo {
      display: flex;
      justify-content: center;
      margin-top: 1.6em
    }
  </style>
    
@endsection
