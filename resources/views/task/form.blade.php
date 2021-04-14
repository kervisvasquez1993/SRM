

<div class="form-row">
    <div class="col-md-12 mb-3">
        <label for="nombre">Titulo de la Tarea<span class="red">*</span></label>
        <input type="text" class="form-control @error('nombre') is-invalid @enderror"  id="nombre" name="nombre" value="{{old('nombre')}}">
        @error('nombre')
        <span class="invalid-feedback d-block" role="alert">
            <strong> {{$message}}</strong>
          </span>
        @enderror
    </div>
</div>

<div class="form-row">
    <div class="col-md-12 mb-3">
        <label for="user_id">Comprador:<span class="red">*</span></label>
        <select class="custom-select" id="user_id" name="user_id" >
            <option selected disabled value="">Selecciona...</option>
            @foreach ($usuarios as $user)
            <option value="{{$user->id}}" {{old('user_id') == $user->id ? 'selected' : ''}}>{{$user->name}}</option>
          @endforeach
        </select>
        @error('user_id')
        <span class="invalid-feedback d-block" role="alert">
            <strong> {{$message}}</strong>
          </span>
        @enderror
    </div>
</div>
<div class="form-row">
    <div class="col-md-12 mb-3">
        <label for="fecha_fin">Fecha Finalizacion<span class="red">*</span></label>
        <input type="date" value="{{old('fecha_fin')}}" id="fecha_fin" name="fecha_fin" class="form-control" pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}">
        @error('fecha_fin')
        <span class="invalid-feedback d-block" role="alert">
            <strong> {{$message}}</strong>
          </span>
        @enderror
    </div>
</div>
<div class="form-group">
    <label for="descripcion">Mensaje:<span class="red">*</span></label>
    <textarea class="form-control" id="descripcion" name="descripcion" rows="3" min="25" ></textarea>
</div>



<div class="form-group mb-10">
    <button class="btn btn-sm btn-outline-success btn-round" type="submit">Enviar</button>
    <button class="btn btn-sm btn-outline-warning btn-round" type="reset" name="reset">Limpiar</button>
</div>