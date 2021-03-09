@extends('admin.dashboar')
@section('content')

<agregar-nueva-Tarea></agregar-nueva-Tarea>
@foreach($tareas as $tarea)
    

    @component('componentes.cardGeneral')
        @slot('titulo')
                {{$tarea->nombre}} - Asignado a {{$tarea->usuarios->name}} - Fecha de Finalizacion : {{ date('d-m-Y', strtotime($tarea->fecha_fin))}}
        @endslot

        @slot('bodyCard')
                {{$tarea->descripcion}}
        @endslot
        
    @endcomponent
    @endforeach
@stop