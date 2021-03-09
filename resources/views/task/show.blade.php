@extends('admin.dashboar')
@section('content')

<div class="content">
<div class="container-fluid">
    <div class="row">
        <div class="col-md-8">
          <div class="row">
              @foreach($tarea->proveedor as $proveedor)
                    {{$proveedor->nombre}}
              @endforeach
             
           
            
            
          </div>
        </div>
    
    </div>
  </div>

  
@endsection