<div 
  class="modal fade" 
  id="deleteModal" 
  tabindex="-1" 
  role="dialog" 
  aria-labelledby="exampleModalLabel" 
  aria-hidden="true"
>

    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          ¿Está seguro que desea eliminar ésta incidencia?
        </div>

        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-secondary btn-round" 
            data-dismiss="modal"
          >
            Cerrar
          </button>

          <button 
            onclick="elimiarIncidencia('{{ $path }}')" 
            type="button" 
            class="btn btn-outline-primary btn-round">
            Eliminar
          </button>
        </div>
      </div>
    </div>

</div>