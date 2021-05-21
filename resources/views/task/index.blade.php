@extends('admin.dashboar')
@section('content')
@if(Auth::user()->rol == 'coordinador')
<div class="container-fluid">
        <button class="btn btn-sm btn-outline-primary btn-round" type="button" data-toggle="modal" data-target="#abrirmodal">
        <i class="fa fa-plus fa-2x"></i>&nbsp;&nbsp;Agregar Tarea
    </button>
</div>
@endif
@foreach($tareas as $tarea)
    @component('componentes.cardGeneral')

    @slot('titulo')
       <span class="tarea"> <status-colors></status-colors> Tarea: {{$tarea->nombre}}</span> <span>Comprador : {{$tarea->usuarios->name}}</span>
    @endslot
    @slot('fechaFin')
    {{ date('d-M-Y', strtotime($tarea->fecha_fin)) }}
    
    @endslot
    @slot('bodyCard')
        {{$tarea->descripcion}}
    @endslot

    @slot('contenidoFooter')
   <div class="stats">
       @php
           $fecha_asignada  = $date::parse(date('d-M-Y', strtotime($tarea->fecha_fin)));
           $fecha_restantes =  $fecha_asignada->diffInDays($date::now()); 
       @endphp
      <i class="material-icons">access_time</i> Finalización : {{ date('d-M-Y', strtotime($tarea->fecha_fin)) }}. Días Restantes: {{$fecha_restantes}} Días
    </div>
    
    <div>
        @if(Auth::user()->rol == 'coordinador')
        <a href="#" type="button" 
                class="btn btn-sm btn-outline-warning btn-round "  
                data-id_tarea="{{$tarea->id}}"
                data-tarea="{{$tarea->nombre}}"
                data-user_name={{$tarea->user_id}}
                data-fecha_fin="{{date('Y-m-d', strtotime($tarea->fecha_fin))}}" 
                data-descripcion="{{$tarea->descripcion}}"
                data-toggle="modal"
                data-target="#abrirmodalEditar">
               Editar
        </a> @endif
    <a href="{{route('tareas.show', ['tarea' => $tarea->id])}}" class="btn btn-sm btn-outline-success btn-round">Ver Detalle</a>
   </div>
  
  @endslot
 @endcomponent

@endforeach
 {{-- componente para listar las tareas --}}
    <div class="modal fade" id="abrirmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-primary modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    
                    <h4 class="modal-title">Agregar Nueva Tarea</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="{{route('tareas.store')}}" method="post" class="form-horizontal">
                        {{csrf_field()}}
                        @include('task.form')
                    </form>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!--Inicio del modal actualizar-->
     <div class="modal fade" id="abrirmodalEditar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true">
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
                        @include('task.form')

                    </form>
                </div>
                
            </div>
            <!-- /.modal-content -->
        </div>
    </div>    
</div> 
@stop

@push('scripts')
   <script type="text/javascript" src="{{asset('assets/js/jquery.filterizr.min')}}"></script>
@endpush


