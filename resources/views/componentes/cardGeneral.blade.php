<div class="card" 
    data-toggle="modal" 
    data-target="#abrirmodalEditar"
    data-id_tarea="{{$dataId}}" 
    data-tarea="{{$dataTarea}}"
    data-comprador="{{$dataComprador}}"
    data-fecha="{{$dataFecha}}"
    data-descripcion="{{$dataDescripcion}}"

    >
    <div class="card-header card-header-text card-header-primary">
      <div class="card-text">
        <h4 class="card-title">{{$titulo}}</h4>
      </div>
    </div>
    <div class="card-body">
        {{$bodyCard}}
    </div>
</div>
