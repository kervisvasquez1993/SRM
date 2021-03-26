<div class="modal fade" id="CreateModal" tabindex="-1" role="">
    <div class="modal-dialog modal-login" role="document">
        <div class="modal-content">

            <div class="justify-content-end">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="material-icons mr-3 mt-3">clear</i>
                </button>
            </div>

            <div class="card card-signup card-plain">
                <div class="modal-body">
                    <form class="form" method="" action="">
                        <p class="description text-center">{{ $modalTitle }}</p>
                        <div class="card-body">

                            <div class="form-group bmd-form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"><i class="material-icons">title</i></div>
                                    </div>
                                    <input id="titulo" type="text" class="form-control" autocomplete="off" placeholder="Titulo...">
                                </div>
                            </div>

                            <div class="form-group bmd-form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"><i class="material-icons">description</i></div>
                                    </div>
                                    <input id="descripcion" type="text" class="form-control" autocomplete="off" placeholder="Descripción...">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer justify-content-center">
                    <a onclick="guardarIncidencia({{ $arte_id }}, '{{ $path }}')" class="btn btn-primary btn-link btn-round btn-wd btn-lg">Guardar</a>
                </div>
            </div>
        </div>
    </div>
</div>