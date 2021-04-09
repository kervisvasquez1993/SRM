@extends('admin.dashboar')
@section('content')

<div class="content">
<div class="container-fluid">
    <div class="row">
      <div class="container-fluid">
        <a href="#" type="button" 
        class="btn btn-sm btn-outline-primary btn-round" 
        data-id_tarea={{$tarea->id}}
        data-toggle="modal" data-target="#abrirmodalEditar"
         >
        Agregar Empresa
        </a>
        <a href="{{route('proveedor-negociacion')}}" type="button" 
        class="btn btn-sm btn-outline-primary btn-round" 
         >
        <span class="font-weight-bold">
            Empresas en Negociacion {{$aprovado->count()}}
        </span>
        </a>       
      </div>
         @if (session('aprobado'))
             <div class="alert alert-success" role="alert">
                 {{ session('aprobado') }}
             </div>
         @endif
        <div class="col-md-12">
          <div class="row">
            
              @php
                $fecha_asignada  = $date::parse(date('d-M-Y', strtotime($tarea->fecha_fin)));
                $fecha_restantes = $fecha_asignada->diffInDays($date::now());
                $dias_creacion    = $date::parse(date('d-M-Y', strtotime($tarea->created_at)));
                $dias_totales    =  $fecha_asignada->diffInDays($dias_creacion);
                $porcentaje = round(($fecha_restantes * 100) / $dias_totales);
               
              @endphp
            
           
              <p class="border border-success rounded m-1 p-2"><span class="font-weight-bold">Nombre de tarea:</span>{{$tarea->nombre}}.</p>
              <p class="border border-success rounded m-1 p-2"> <span class="font-weight-bold"> Fecha de Finalizacion</span> : {{ date('d-M-Y', strtotime($tarea->fecha_fin))}}.</p>
              <p class="border border-success rounded m-1 p-2"><span class="font-weight-bold">DIAS RESTANTE </span> :{{$fecha_restantes}} dias</p>
              <p class=""></p>
              <p>
                {{$tarea->descripcion}}
              </p>
              <br>
              {{$porcentaje}}%
              <div class="progress-container">
                <span class="progress-badge">Default</span>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="{{$porcentaje}}" aria-valuemin="0" aria-valuemax="100" style="width: {{$porcentaje}}%;">
                    </div>
                </div>
                <div class="progress">
                  <div class="progress-bar progress-bar-striped progress-bar-danger danger progress-bar" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
              @foreach($noAprovado as $proveedor)
                 {{-- <h3>Nombre del Proveedor:  {{$proveedor->nombre}}</h3> --}}
           
                 @component('componentes.cardGeneral')
                    @slot('titulo')
                    <div> Nombre Empresa: {{$proveedor->nombre}}</div>  
                    <div class="d-flex">
                      <form action="{{route('negociaciones.update', ['negociar' => $proveedor->id])}}" method="post">
                        @csrf
                        @method('PUT')
                        <input type="hidden" name="aprovado" value="1" >
                        <input type="hidden" name="name" value="{{$proveedor->id}}" >
                        <input type="submit" value="Negociar" class="btn btn-sm  btn-info" >
                      </form>
                      {{-- //TODO: CAMBIAR LA FUNCIONALIDAD PARA QUE SE ENVIA POR JS Y NO POR UN FORMULARIO --}}
                      <a href="#" type="button" 
                                class="btn btn-warning btn-sm "  
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
                         Editar
                      </a>
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
