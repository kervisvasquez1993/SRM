@extends('admin.dashboar')
@section('content')

<div class="content">
<div class="container-fluid">
    <div class="row">
        <div class="col-md-8">
          <div class="row">
              @foreach($tarea->proveedor as $proveedor)
                 <h3>Nombre del Proveedor:  {{$proveedor->nombre}}</h3>
                 <h4>estatus: {{$proveedor->pivot}}</h4>

                 <h5>Tarea: {{$proveedor->tarea}}</h5>
              @endforeach
             
           
            
            
          </div>
        </div>
    
    </div>
  </div>

  
@endsection