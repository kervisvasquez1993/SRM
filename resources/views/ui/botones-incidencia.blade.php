<div class="d-flex justify-content-between">
    <button
    class="btn btn-outline-primary btn-round"
    data-toggle="modal" 
    data-target="#CreateModal"
    >
      <span class="material-icons mr-2">
        add_circle_outline
      </span>
      Crear
    </button>

    <a
    class="btn btn-outline-primary btn-round" 
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