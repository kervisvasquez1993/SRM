@extends('admin.dashboar')


@section('content')


  <div class="">
    
    @foreach( $artes as $arte )

      {{-- Card --}}
      <div id="{{ $arte->id }}" onclick="showModal({{ $arte }}, {{ $estatus }})" class="card"  data-toggle="modal" data-target="#exampleModal">

        <div class="card-header d-flex justify-content-between flex-wrap">
            <h4 class="card-title"><strong class="text-secondary">Tarea: </strong> <span id="arte-name">{{ $arte->nombre }}</span></h4>
            <h4 class=""> <strong class="text-secondary">Proveedor: </strong> {{ $arte->pivotTable->proveedor->nombre }}</h4>
            <h4 class=""> <strong class="text-secondary">Fecha Fin: </strong> {{ date('d-m-Y', strtotime($arte->fecha_fin)) }}</h4>
        </div>
        <div class="card-body">
            <strong class="text-secondary">Estatus: </strong>

            <div class="status d-flex justify-content-between">
                <span class="mr-3"><strong class="text-secondary">Creación de Fichas:</strong> <span id="card-ficha-estatus">{{ $arte->fichasEstatus->estatus }}</span></span>
                <span class="mr-3"><strong class="text-secondary">Validación de Fichas:</strong> <span id="card-validacion-ficha">{{ $arte->validacionFichasEstatus->estatus }}</span></span>
                <span class="mr-3"><strong class="text-secondary">Creación de Boceto:</strong> <span id="card-boceto-estatus">{{ $arte->bocetosEstatus->estatus }}</span></span>
                <span class="mr-3"><strong class="text-secondary">Validación de Boceto:</strong> <span id="card-validacion-boceto">{{ $arte->validacionBocetosEstatus->estatus }}</span></span>
                <span class="mr-3"><strong class="text-secondary">Confirmación de Proveedor:</strong> <span id="card-confirm-proveedor">{{ $arte->confirmacionProveedorEstatus->estatus }}</span></span>
            </div>
        </div>


      </div>
        
        
    @endforeach
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Estatus para: <span id="modal-name"></span></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                
                
                <form class="row" enctype="multipart/form-data" method="post">
                  @csrf

                  <div class="form-group  col-md-6">
                      <label for="creacion_ficha">Creacion de Fichas</label>

                      <select name="creacion_ficha" id="creacion_ficha" class="form-control">
                          @foreach($estatus as $item)
                            <option value="{{ $item->id }}">{{ $item->estatus }}</option>
                            
                          @endforeach
                      </select>
                  </div>

                  <div class="form-group  col-md-6">
                      <label for="validacion_ficha">Validación de Fichas</label>

                      <select name="validacion_ficha" id="validacion_ficha" class="form-control">
                        @foreach($estatus as $item)
                          <option value="{{ $item->id }}" {{ old('validacion_ficha') == $item->id ? 'selected': '' }}>{{ $item->estatus }}</option>
                        @endforeach
                      </select>
                  </div>

                  <div class="form-group col-md-6">
                      <label for="creacion_boceto">Creación de Boceto</label>

                      <select name="creacion_boceto" id="creacion_boceto" class="form-control">
                        @foreach($estatus as $item)
                          <option value="{{ $item->id }}" {{ old('creacion_boceto') == $item->id ? 'selected': '' }}>{{ $item->estatus }}</option>
                        @endforeach
                      </select>
                  </div>

                  <div class="form-group col-md-6">
                      <label for="validacion_boceto">Validación de Boceto</label>

                      <select name="validacion_boceto" id="validacion_boceto" class="form-control">
                        @foreach($estatus as $item)
                          <option value="{{ $item->id }}" {{ old('validacion_boceto') == $item->id ? 'selected': '' }}>{{ $item->estatus }}</option>
                        @endforeach
                      </select>
                  </div>

                  <div class="form-group col-md-6">
                      <label for="confirmacion_proveedor">Confirmación de Proveedor</label>

                      <select name="confirmacion_proveedor" id="confirmacion_proveedor" class="form-control">
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
    
  </div>

@endsection

@section('script')
<script>
  
  /** 
    Display Arte information on modal
  */
  function showModal ( arte, estatus ) {


    const cardArtName = document.getElementById('arte-name').innerHTML;

    
    // Change modal title
    document.getElementById('modal-name').innerText = cardArtName;

    // References to the selects in the form
    let optionsCreacionFicha = document.getElementById('creacion_ficha').options;
    let optionsValidFicha = document.getElementById('validacion_ficha').options;
    let optionsCreacionBoceto = document.getElementById('creacion_boceto').options;
    let optionsValidBoceto = document.getElementById('validacion_boceto').options;
    let optionsConfirmProveedor = document.getElementById('confirmacion_proveedor').options;

    estatus.forEach( (item, index) => {
      // Reference to each option in the select
      let optCreationFicha = optionsCreacionFicha[index];
      let optValidFicha = optionsValidFicha[index];
      let optCreacionBoceto = optionsCreacionBoceto[index];
      let optValidBoceto = optionsValidBoceto[index];
      let optConfirmProveedor = optionsConfirmProveedor[index];
      // Select the option depending on the status of the arte entity
      optCreationFicha.selected = item.estatus === document.getElementById('card-ficha-estatus').innerText;
      optValidFicha.selected = item.estatus === document.getElementById('card-validacion-ficha').innerText;
      optCreacionBoceto.selected = item.estatus === document.getElementById('card-boceto-estatus').innerText;
      optValidBoceto.selected = item.estatus === document.getElementById('card-validacion-boceto').innerText;
      optConfirmProveedor.selected = item.estatus === document.getElementById('card-confirm-proveedor').innerText;

      
    });
  }

  /** 
    Submit changes on Arte estatus
  */
  function submit( arte, estatus ) {
    // Params to edit 
    const params = {
      creacion_ficha: document.getElementById('creacion_ficha').value,
      validacion_ficha: document.getElementById('validacion_ficha').value,
      creacion_boceto: document.getElementById('creacion_boceto').value,
      validacion_boceto: document.getElementById('validacion_boceto').value,
      confirmacion_proveedor: document.getElementById('confirmacion_proveedor').value
    };

    // Post changes to controller
    axios.post(
      `/artes/${ arte.id }`,
      { params, _method: 'put'}
    ).then( resp => {
      // Response after Arte is edited

      const updatedArte = resp.data;
      
      
      // Hide Modal
      $('#exampleModal').modal('hide')
      // document.write(resp.data);
      // document.close();

      const cardUpdated = document.getElementById(`${ arte.id }`);
      const cardStatus = cardUpdated.getElementsByClassName('card-body')[0].children[1];

      const estCreacionFicha = estatus.find( est => est.id === updatedArte.creacion_fichas );
      const estValidacionFicha = estatus.find( est => est.id === updatedArte.validacion_fichas );
      const estCreacionBoceto = estatus.find( est => est.id === updatedArte.creacion_boceto );
      const estValidacionBoceto = estatus.find( est => est.id === updatedArte.validacion_boceto );
      const estConfirmacionProveedor = estatus.find( est => est.id === updatedArte.confirmacion_proveedor );

      // Update card information
      cardStatus.innerHTML = `
        <span class="mr-3"><strong class="text-secondary">Creación de Fichas:</strong> <span id="card-ficha-estatus">${  estCreacionFicha.estatus }</span></span>
        <span class="mr-3"><strong class="text-secondary">Validación de Fichas:</strong> <span id="card-validacion-ficha">${ estValidacionFicha.estatus }</span></span>
        <span class="mr-3"><strong class="text-secondary">Creación de Boceto:</strong> <span id="card-boceto-estatus">${ estCreacionBoceto.estatus }</span></span>
        <span class="mr-3"><strong class="text-secondary">Validación de Boceto:</strong> <span id="card-validacion-boceto">${ estValidacionBoceto.estatus }</span></span>
        <span class="mr-3"><strong class="text-secondary">Confirmación de Proveedor:</strong> <span id="card-confirm-proveedor">${ estConfirmacionProveedor.estatus }</span></span>
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

