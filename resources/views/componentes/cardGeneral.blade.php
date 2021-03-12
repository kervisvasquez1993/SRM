<div class="card" 
    data-toggle="modal" 
    data-target="#abrirmodalEditar"
    data-id_tarea="{{$dataId}}" 
    data-tarea="{{$dataTarea}}"
    data-comprador="{{$dataComprador}}"
    data-fecha="{{$dataFecha}}"
    data-descripcion="{{$dataDescripcion}}"

    >
    <div class="card-header  b-main">
      <div class="card-text c-white">
        <h4 class="card-title">{{$titulo}}</h4>
      </div>
    </div>
    <div class="card-body">
        {{$bodyCard}}
    </div>
    <div class="card-footer">
      <div class="stats d-flex justify-content-between">
        <i class="material-icons">access_time</i> Fecha de Finalización : {{$fechaFin}}
      </div>
    </div>
</div>
