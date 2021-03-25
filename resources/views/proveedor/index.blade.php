@extends('admin.dashboar')

@section('content')

@foreach($aprobados as $value)
@if($value->proveedor->aprovado )    
    <div>{{$value->proveedor->nombre}}</div> 
    <div>{{$value->tarea->nombre}}</div>
    <div>{{$value->tarea->usuarios->name}}</div>

@endif
    
    <br>
    <br>
   
    <br>
@endforeach

 @endsection
