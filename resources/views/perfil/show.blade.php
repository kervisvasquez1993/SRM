@extends('admin.dashboar')
@section('content')

<div class="content">
<div class="container-fluid">
    <div class="row">
        <div class="col-md-8">
          <div class="row">
              @foreach($perfil->usuario->tareas as $tarea)
              <div class="card">
                <div class="card-header card-header-danger">
                    <h4 class="card-title">{{$tarea->nombre}}</h4>
                    <p class="category">{{$tarea->fecha_fin}}</p>
                </div>
                <div class="card-body">
                    {{$tarea->descripcion}}
                </div>
            </div>
              @endforeach
           
            
            
          </div>
        </div>
      <div class="col-md-4">
        <div class="card card-profile">
          <div class="card-avatar">
            <a href="javascript:;">
              <img class="img" src="../assets/img/faces/marc.jpg" />
            </a>
          </div>
          <div class="card-body">
            
            <h4 class="card-title">{{$perfil->usuario->name}}</h4>
            <p class="card-description">
              {{ $perfil->biografia}}
            </p>
            <a href="{{route('perfil.edit', ['perfil' => $perfil->id])}}" class="btn btn-primary btn-round">Editar Perfil</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  
@endsection