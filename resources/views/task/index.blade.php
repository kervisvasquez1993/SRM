@extends('admin.dashboar')
@section('content')
 
<agregar-nueva-Tarea 
></agregar-nueva-Tarea>

    

    @component('componentes.cardGeneral')
        @slot('titulo')
                {{"tarea->nombre"}} - Asignado a {{"tarea->usuarios->name"}} - Fecha de Finalizacion
        @endslot

        @slot('bodyCard')
                {{-- {{$tarea->descripcion}} --}}

                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, sint!
        @endslot
        
    @endcomponent
    @component('componentes.cardGeneral')
    @slot('titulo')
            {{"tarea->nombre"}} - Asignado a {{"tarea->usuarios->name"}} - Fecha de Finalizacion
    @endslot

    @slot('bodyCard')
            {{-- {{$tarea->descripcion}} --}}

            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, sint!
    @endslot
    
@endcomponent
@component('componentes.cardGeneral')
@slot('titulo')
        {{"tarea->nombre"}} - Asignado a {{"tarea->usuarios->name"}} - Fecha de Finalizacion
@endslot

@slot('bodyCard')
        {{-- {{$tarea->descripcion}} --}}

        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, sint!
@endslot

@endcomponent
@component('componentes.cardGeneral')
@slot('titulo')
        {{"tarea->nombre"}} - Asignado a {{"tarea->usuarios->name"}} - Fecha de Finalizacion
@endslot

@slot('bodyCard')
        {{-- {{$tarea->descripcion}} --}}

        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, sint!
@endslot

@endcomponent
@component('componentes.cardGeneral')
@slot('titulo')
        {{"tarea->nombre"}} - Asignado a {{"tarea->usuarios->name"}} - Fecha de Finalizacion
@endslot

@slot('bodyCard')
        {{-- {{$tarea->descripcion}} --}}

        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, sint!
@endslot

@endcomponent
@component('componentes.cardGeneral')
@slot('titulo')
        {{"tarea->nombre"}} - Asignado a {{"tarea->usuarios->name"}} - Fecha de Finalizacion
@endslot

@slot('bodyCard')
        {{-- {{$tarea->descripcion}} --}}

        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, sint!
@endslot

@endcomponent
@component('componentes.cardGeneral')
@slot('titulo')
        {{"tarea->nombre"}} - Asignado a {{"tarea->usuarios->name"}} - Fecha de Finalizacion
@endslot

@slot('bodyCard')
        {{-- {{$tarea->descripcion}} --}}

        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, sint!
@endslot

@endcomponent
@component('componentes.cardGeneral')
@slot('titulo')
        {{"tarea->nombre"}} - Asignado a {{"tarea->usuarios->name"}} - Fecha de Finalizacion
@endslot

@slot('bodyCard')
        {{-- {{$tarea->descripcion}} --}}

        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, sint!
@endslot

@endcomponent
@component('componentes.cardGeneral')
@slot('titulo')
        {{"tarea->nombre"}} - Asignado a {{"tarea->usuarios->name"}} - Fecha de Finalizacion
@endslot

@slot('bodyCard')
        {{-- {{$tarea->descripcion}} --}}

        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, sint!
@endslot

@endcomponent
@component('componentes.cardGeneral')
@slot('titulo')
        {{"tarea->nombre"}} - Asignado a {{"tarea->usuarios->name"}} - Fecha de Finalizacion
@endslot

@slot('bodyCard')
        {{-- {{$tarea->descripcion}} --}}

        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, sint!
@endslot

@endcomponent
@component('componentes.cardGeneral')
@slot('titulo')
        {{"tarea->nombre"}} - Asignado a {{"tarea->usuarios->name"}} - Fecha de Finalizacion
@endslot

@slot('bodyCard')
        {{-- {{$tarea->descripcion}} --}}

        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, sint!
@endslot

@endcomponent
@component('componentes.cardGeneral')
@slot('titulo')
        {{"tarea->nombre"}} - Asignado a {{"tarea->usuarios->name"}} - Fecha de Finalizacion
@endslot

@slot('bodyCard')
        {{-- {{$tarea->descripcion}} --}}

        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, sint!
@endslot

@endcomponent

@stop