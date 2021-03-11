

<div class="form-row">
    <div class="col-md-12 mb-3">
        <label for="validarNombre">Titulo de la Tarea<span class="red">*</span></label>
        <input type="text" class="form-control" id="validarNombre" name="validarNombre" required>
    </div>
</div>

<div class="form-row">
    <div class="col-md-12 mb-3">
        <label for="validarTema">Comprador:<span class="red">*</span></label>
        <select class="custom-select" id="validarTema" name="validarTema" required>
            <option selected disabled value="">Selecciona...</option>
            @foreach ($usuarios as $user)
            <option value="{{$user->id}}">{{$user->name}}</option>
          @endforeach
        </select>
    </div>
</div>

<div class="form-group">
    <label for="validationMensaje">Mensaje:<span class="red">*</span></label>
    <textarea class="form-control" id="validationMensaje" name="validationMensaje" rows="3" min="25" required></textarea>
</div>

<div class="form-group mb-10">
    <button class="btn btn-primary" type="submit" name="submit">Enviar</button>
    <button class="btn btn-success" type="reset" name="reset">Limpiar</button>
</div>