
<h4>Filtrar</h4>
<form class="form-inline" action="{{ route('artes.index') }}" method="GET">

  <div class="filter">
      <label for="campo_filtro">Campo</label>
      <select name="campo_filtro" class="form-control" id="campo_filtro" onclick="enableButton()">
        <option value="">Seleccione...</option>
        <option value="creacion_fichas">Creación de Fichas</option>
        <option value="validacion_fichas">Validacion de Fichas</option>
        <option value="creacion_boceto">Creacion de Boceto</option>
        <option value="validacion_boceto">Validacion de Boceto</option>
        <option value="confirmacion_proveedor">Confirmacion de proveedor</option>
      </select>
  </div>

  <div class="filter">
      <label for="estatus_id">Estatus</label>
      <select name="estatus_id" class="form-control" id="estatus_id" onclick="enableButton()">
        <option value="">Seleccione...</option>
        @foreach($estatus as $est)
          <option 
            value="{{ $est->id }}"
            {{old('estatus_id') == $est->id ? 'selected' : ''}}
          >
            {{ $est->estatus }}
          </option>
        @endforeach

      </select>
  </div>

  <button
    id="filter-button" 
    type="submit" 
    class="btn btn-outline-primary btn-inline filter filter-btn" 
    data-toggle="tooltip" 
    data-placement="top" 
    title="Filtrar"
    disabled
  >
    <span class="material-icons">
      filter_alt
      </span>
    
  </button>



</form>

<div>
  <div class="d-flex justify-content-between">
    <h4 id="result" class="result"><strong>Resultados de la Búsqueda: </strong></h4>
  
    <a
    id="return" 
    class="btn btn-outline-primary btn-round return" 
    href="{{ url('/artes') }}"
    data-toggle="tooltip" 
    data-placement="left" 
    title="Regresar"
    >
      <span class="material-icons mr-2">
        keyboard_backspace
      </span>
      Regresar
    </a>
  
  </div>
</div>

@section('css')
<style>
  .result, .return, {
    display: none;
  }
</style>
@endsection

@section('scripts')
<script type="application/javascript">

    document.getElementById('result').style.display = 'none';
    document.getElementById('return').style.display = 'none';

  if ( document.location.search !== '' ) {
    document.getElementById('result').style.display = 'initial';
    document.getElementById('return').style.display = 'initial';
  }
  
  // Enable button when form is filled 
  function enableButton() {
    const button = document.getElementById('filter-button');
    const campoFiltro = document.getElementById('campo_filtro');
    const estatus = document.getElementById('estatus_id')


    if ( campoFiltro.value != '' && estatus.value != '' ) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }

  }
</script>

@endsection
