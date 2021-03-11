

<div class="form-row">
    <div class="col-md-12 mb-3">
        <label for="nombre">Titulo de la Tarea<span class="red">*</span></label>
        <input type="text" class="form-control" id="nombre" name="nombre" required>
    </div>
</div>

<div class="form-row">
    <div class="col-md-12 mb-3">
        <label for="user_id">Comprador:<span class="red">*</span></label>
        <select class="custom-select" id="user_id" name="user_id" required>
            <option selected disabled value="">Selecciona...</option>
            @foreach ($usuarios as $user)
            <option value="{{$user->id}}">{{$user->name}}</option>
          @endforeach
        </select>
    </div>
</div>
<div class="form-row">
    <div class="col-md-12 mb-3">
        <label for="fecha_fin">Fecha Finalizacion<span class="red">*</span></label>
        <input type="text" class="form-control" id="fecha_fin" name="fecha_fin" required>
    </div>
</div>

<div class="form-group">
    <label for="descripcion">Mensaje:<span class="red">*</span></label>
    <textarea class="form-control" id="descripcion" name="descripcion" rows="3" min="25" required></textarea>
</div>


<div class="form-group mb-10">
    <button class="btn btn-primary" type="submit">Enviar</button>
    <button class="btn btn-success" type="reset" name="reset">Limpiar</button>
</div>