@extends('admin.dashboar')


@section('content')

  @include('ui.filter',  array('estatus' => $estatus))

  <div class="">


    @if( count($artes) > 0 )
      
      @foreach( $artes as $arte )

        {{-- Card --}}
        <div id="{{ $arte->id }}" class="card">

          <div class="card-header d-flex justify-content-between flex-wrap">
              <h4 class="card-title"><strong class="text-secondary">Tarea: </strong> <span id="arte-name">{{ $arte->nombre }}</span></h4>
              <h4 class=""> <strong class="text-secondary">Proveedor: </strong> {{ $arte->pivotTable->proveedor->nombre }}</h4>
              <h4 class=""> <strong class="text-secondary">Fecha Fin: </strong> {{ date('d-m-Y', strtotime($arte->fecha_fin)) }}</h4>
          </div>
          <hr class="separator">
          <div class="card-body">
              <strong class="text-secondary">Estatus: </strong>

              <div class="status d-flex justify-content-between">
                  <span class="mr-3"><strong class="text-secondary">Creación de Fichas:</strong> <span id="card-ficha-estatus-{{ $arte->id }}">{{ $arte->fichasEstatus->estatus }}</span></span>
                  <span class="mr-3"><strong class="text-secondary">Validación de Fichas:</strong> <span id="card-validacion-ficha-{{ $arte->id }}">{{ $arte->validacionFichasEstatus->estatus }}</span></span>
                  <span class="mr-3"><strong class="text-secondary">Creación de Boceto:</strong> <span id="card-boceto-estatus-{{ $arte->id }}">{{ $arte->bocetosEstatus->estatus }}</span></span>
                  <span class="mr-3"><strong class="text-secondary">Validación de Boceto:</strong> <span id="card-validacion-boceto-{{ $arte->id }}">{{ $arte->validacionBocetosEstatus->estatus }}</span></span>
                  <span class="mr-3"><strong class="text-secondary">Confirmación de Proveedor:</strong> <span id="card-confirm-proveedor-{{ $arte->id }}">{{ $arte->confirmacionProveedorEstatus->estatus }}</span></span>
              </div>
          </div>

          <div class="d-flex justify-content-end m-2">
            <span class="material-icons launch" onclick="showModal({{ $arte }}, {{ $estatus }})" data-toggle="modal" data-target="#modal-{{ $arte->id }}">
              launch
            </span>
          </div>

        </div>
          
          
          <!-- Modal -->
          <div class="modal fade" id="modal-{{ $arte->id }}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Estatus para: <span id="modal-name-{{ $arte->id }}"></span></h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  
                  
                  <form class="row" enctype="multipart/form-data" method="post">
                    @csrf


                    <div class="form-group  col-md-6">
                        <label for="creacion_ficha">Creacion de Fichas</label>
                        <select name="creacion_ficha" id="creacion_ficha-{{ $arte->id }}" class="form-control">
                            @foreach($estatus as $item)
                              <option value="{{ $item->id }}">{{ $item->estatus }}</option>
                              
                            @endforeach
                        </select>
                    </div>

                    <div class="form-group  col-md-6">
                        <label for="validacion_ficha">Validación de Fichas</label>

                        <select name="validacion_ficha" id="validacion_ficha-{{ $arte->id }}" class="form-control">
                          @foreach($estatus as $item)
                            <option value="{{ $item->id }}" {{ old('validacion_ficha') == $item->id ? 'selected': '' }}>{{ $item->estatus }}</option>
                          @endforeach
                        </select>
                    </div>

                    <div class="form-group col-md-6">
                        <label for="creacion_boceto">Creación de Boceto</label>

                        <select name="creacion_boceto" id="creacion_boceto-{{ $arte->id }}" class="form-control">
                          @foreach($estatus as $item)
                            <option value="{{ $item->id }}" {{ old('creacion_boceto') == $item->id ? 'selected': '' }}>{{ $item->estatus }}</option>
                          @endforeach
                        </select>
                    </div>

                    <div class="form-group col-md-6">
                        <label for="validacion_boceto">Validación de Boceto</label>

                        <select name="validacion_boceto" id="validacion_boceto-{{ $arte->id }}" class="form-control">
                          @foreach($estatus as $item)
                            <option value="{{ $item->id }}" {{ old('validacion_boceto') == $item->id ? 'selected': '' }}>{{ $item->estatus }}</option>
                          @endforeach
                        </select>
                    </div>

                    <div class="form-group col-md-6">
                        <label for="confirmacion_proveedor">Confirmación de Proveedor</label>

                        <select name="confirmacion_proveedor" id="confirmacion_proveedor-{{ $arte->id }}" class="form-control">
                          @foreach($estatus as $item)
                            <option value="{{ $item->id }}" {{ old('confirmacion_proveedor') == $item->id ? 'selected': '' }}>{{ $item->estatus }}</option>
                          @endforeach
                        </select>
                    </div>
                    

                  </form>

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                  <button type="submit" onclick="submit({{ $arte }}, {{ $estatus }})" class="btn btn-primary">Guardar Cambios</button>
                </div>
              </div>
            </div>
          </div>
        @endforeach




    @else
      {{-- Empty view --}}
      <div class="no-result d-flex justify-content-center align-items-center mt-3">
        <span class="material-icons mr-2">
          search_off
        </span>
        No hay registros a mostrar.
      </div>
    
    @endif
    
  </div>

@endsection

@section('script')
<script>

  /** 
    Display Arte information on modal
  */
  function showModal ( arte, estatus ) {

    const modal = document.getElementById(`modal-${ arte.id }`);

    // Change modal title
    document.getElementById(`modal-name-${ arte.id }`).innerText = arte.nombre;

    // References to the selects in the form
    let optionsCreacionFicha = document.getElementById(`creacion_ficha-${arte.id}`).options;
    let optionsValidFicha = document.getElementById(`validacion_ficha-${arte.id}`).options;
    let optionsCreacionBoceto = document.getElementById(`creacion_boceto-${arte.id}`).options;
    let optionsValidBoceto = document.getElementById(`validacion_boceto-${arte.id}`).options;
    let optionsConfirmProveedor = document.getElementById(`confirmacion_proveedor-${arte.id}`).options;

    estatus.forEach( (item, index) => {
      // Reference to each option in the select
      let optCreationFicha = optionsCreacionFicha[index];
      let optValidFicha = optionsValidFicha[index];
      let optCreacionBoceto = optionsCreacionBoceto[index];
      let optValidBoceto = optionsValidBoceto[index];
      let optConfirmProveedor = optionsConfirmProveedor[index];
      // Select the option depending on the status of the arte entity
      optCreationFicha.selected = item.estatus === document.getElementById(`card-ficha-estatus-${ arte.id }`).innerText;
      optValidFicha.selected = item.estatus === document.getElementById(`card-validacion-ficha-${ arte.id }`).innerText;
      optCreacionBoceto.selected = item.estatus === document.getElementById(`card-boceto-estatus-${ arte.id }`).innerText;
      optValidBoceto.selected = item.estatus === document.getElementById(`card-validacion-boceto-${ arte.id }`).innerText;
      optConfirmProveedor.selected = item.estatus === document.getElementById(`card-confirm-proveedor-${ arte.id }`).innerText;
     
    });
  }

  /** 
    Submit changes on Arte estatus
  */
  function submit( arte, estatus ) {
    // Params to edit 
    const params = {
      creacion_ficha: document.getElementById(`creacion_ficha-${arte.id}`).value,
      validacion_ficha: document.getElementById(`validacion_ficha-${arte.id}`).value,
      creacion_boceto: document.getElementById(`creacion_boceto-${arte.id}`).value,
      validacion_boceto: document.getElementById(`validacion_boceto-${arte.id}`).value,
      confirmacion_proveedor: document.getElementById(`confirmacion_proveedor-${arte.id}`).value
    };


    // Post changes to controller
    axios.post(
      `/artes/${ arte.id }`,
      { params, _method: 'put'}
    ).then( resp => {
      // Response after Arte is edited

      const updatedArte = resp.data;
      
      
      // Hide Modal
      $(`#modal-${arte.id}`).modal('hide')


      const cardUpdated = document.getElementById(`${ arte.id }`);
      const cardStatus = cardUpdated.getElementsByClassName('card-body')[0].children[1];

      // New estatus yto show in the card
      const estCreacionFicha = estatus.find( est => est.id === updatedArte.creacion_fichas );
      const estValidacionFicha = estatus.find( est => est.id === updatedArte.validacion_fichas );
      const estCreacionBoceto = estatus.find( est => est.id === updatedArte.creacion_boceto );
      const estValidacionBoceto = estatus.find( est => est.id === updatedArte.validacion_boceto );
      const estConfirmacionProveedor = estatus.find( est => est.id === updatedArte.confirmacion_proveedor );

      // Update card information
      cardStatus.innerHTML = `
        <span class="mr-3"><strong class="text-secondary">Creación de Fichas:</strong> <span id="card-ficha-estatus-${ arte.id }">${  estCreacionFicha.estatus }</span></span>
        <span class="mr-3"><strong class="text-secondary">Validación de Fichas:</strong> <span id="card-validacion-ficha-${ arte.id }">${ estValidacionFicha.estatus }</span></span>
        <span class="mr-3"><strong class="text-secondary">Creación de Boceto:</strong> <span id="card-boceto-estatus-${ arte.id }">${ estCreacionBoceto.estatus }</span></span>
        <span class="mr-3"><strong class="text-secondary">Validación de Boceto:</strong> <span id="card-validacion-boceto-${ arte.id }">${ estValidacionBoceto.estatus }</span></span>
        <span class="mr-3"><strong class="text-secondary">Confirmación de Proveedor:</strong> <span id="card-confirm-proveedor-${ arte.id }">${ estConfirmacionProveedor.estatus }</span></span>
      `;      

    })
    
  }
</script>
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
    }
    
    .card-body{
        margin-top: -30px;
    }

    .launch {
      cursor: pointer;
    }
    .filter {
      margin: 10px;
    }

    .form-inline label {
      justify-content: start;
    }

    select {
      min-width: 12rem;
    }

    @media (max-width: 520px) {
        
      .status {
          flex-direction: column;
      }
    }

    @media (min-width: 600px) {
      .separator {
        display: none;
      }
    }

</style>
@endsection

