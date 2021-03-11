@extends('admin.dashboar')


@section('content')


  <div class="">
    @foreach( $artes as $arte )

        {{-- Card --}}
        <div class="card" data-toggle="modal" data-target="#exampleModal">

          <div class="card-header d-flex justify-content-between flex-wrap">
              <h4 class="card-title"><strong class="text-secondary">Tarea: </strong>{{ $arte->nombre }}</h4>
              <h4 class=""> <strong class="text-secondary">Proveedor: </strong> {{ $arte->pivotTable->proveedor->nombre }}</h4>
              <h4 class=""> <strong class="text-secondary">Fecha Fin: </strong> {{ date('d-m-Y', strtotime($arte->fecha_fin)) }}</h4>
          </div>
          <div class="card-body">
              <strong class="text-secondary">Estatus: </strong>

              <div class="status d-flex justify-content-between">
                  <span class="mr-3"><strong class="text-secondary">Creación de Fichas:</strong> {{ $arte->creacion_fichas }}</span>
                  <span class="mr-3"><strong class="text-secondary">Validación de Fichas:</strong> {{ $arte->validacion_fichas }}</span>
                  <span class="mr-3"><strong class="text-secondary">Creación de Boceto:</strong> {{ $arte->creacion_boceto }}</span>
                  <span class="mr-3"><strong class="text-secondary">Validación de Boceto:</strong> {{ $arte->validacion_boceto }}</span>
                  <span class="mr-3"><strong class="text-secondary">Confirmación de Proveedor:</strong> {{ $arte->confirmacion_proveedor }}</span>
              </div>
          </div>


        </div>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Estatus para: <strong>{{ $arte->nombre }}</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                
                {{-- Form --}}
                <form class="row">
                    

                  <div class="form-group  col-md-6">
                      <label for="creacion_ficha">Creacion de Fichas</label>

                      <select name="creacion_ficha" id="creacion_ficha" class="form-control">
                          <option value="1">Opcion 1</option>
                          <option value="2">Opcion 2</option>
                          <option value="3">Opcion 3</option>
                      </select>
                  </div>

                  <div class="form-group  col-md-6">
                      <label for="validacion_ficha">Validación de Fichas</label>

                      <select name="validacion_ficha" id="validacion_ficha" class="form-control">
                          <option value="1">Opcion 1</option>
                          <option value="2">Opcion 2</option>
                          <option value="3">Opcion 3</option>
                      </select>
                  </div>

                  <div class="form-group col-md-6">
                      <label for="creacion_boceto">Creación de Boceto</label>

                      <select name="creacion_boceto" id="creacion_boceto" class="form-control">
                          <option value="1">Opcion 1</option>
                          <option value="2">Opcion 2</option>
                          <option value="3">Opcion 3</option>
                      </select>
                  </div>

                  <div class="form-group col-md-6">
                      <label for="validacion_boceto">Validación de Boceto</label>

                      <select name="validacion_boceto" id="validacion_boceto" class="form-control">
                          <option value="1">Opcion 1</option>
                          <option value="2">Opcion 2</option>
                          <option value="3">Opcion 3</option>
                      </select>
                  </div>

                  <div class="form-group col-md-6">
                      <label for="confirmacion_proveedor">Confirmación de Proveedor</label>

                      <select name="confirmacion_proveedor" id="confirmacion_proveedor" class="form-control">
                          <option value="1">Opcion 1</option>
                          <option value="2">Opcion 2</option>
                          <option value="3">Opcion 3</option>
                      </select>
                  </div>
                  

                </form>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>

        
    @endforeach
    
  </div>

@endsection

@section('ccs_file')
<style>
    .set-back {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 10;
    }
    .card {
        margin-top: 20px;
        margin-bottom: 20px;
        cursor: pointer;
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