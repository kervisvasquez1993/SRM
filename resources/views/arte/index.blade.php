@extends('admin.dashboar')


@section('content')


  <div class="">
    {{ $artes }}
    @foreach( $artes as $arte )
      
    @endforeach
    <div class="card">
      <div class="card-header d-flex justify-content-between flex-wrap">
        <h4 class="card-title"><strong class="text-secondary">Tarea: </strong>{{ $arte->nombre}}</h4>
        <h4 class=""> <strong class="text-secondary">Proveedor: </strong> {{ $arte->pivotTable->proveedor->nombre }}</h4>
        <h4 class=""> <strong class="text-secondary">Fecha Fin: </strong> {{ date('d-m-Y', strtotime($arte->fecha_fin)) }}</h4>
      </div>
      <div class="card-body">
        <strong class="text-secondary">Estatus: </strong>

        <div class=" status d-flex justify-content-between">
            <span class="mr-3">Creación de Fichas: En Proceso</span>
            <span class="mr-3">Validación de Fichas: En Proceso</span>
            <span class="mr-3">Creación de Boceto: En Proceso</span>
            <span class="mr-3">Validación de Boceto: En Proceso</span>
            <span class="mr-3">Confirmación de Proveedor: En Proceso</span>
        </div>
      </div>
    </div>
    
  </div>


@endsection

@section('ccs_file')
<style>

    .card {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    
    .card-body{
        margin-top: -30px;
    }

    @media (max-width: 520px) {
        
      .status {
          flex-direction: column;
      }
    }

</style>
@endsection