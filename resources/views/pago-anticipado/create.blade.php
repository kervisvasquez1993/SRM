@extends('admin.dashboar')
@section('content')
<div class="d-flex justify-content-end">
    <a
        class="btn btn-outline-primary btn-round" 
        href="{{ url('/produccion-transito') }}"
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

<h4>Crear Pago de Anticipo</h4>

<form novalidate class="m-2" method="POST" action="{{ route('pago-anticipado.store', ['id_produccion_transito' => $idProduccionTransito]) }}">

    @csrf

    <div class="row">
        <div class="col-12 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group  @error('titulo') has-danger @enderror">
                <label class="bmd-label-floating">Titulo</label>
                <input value="{{ old('titulo') }}" autocomplete="off" name="titulo" type="text" class="form-control">
                @error('titulo')
                    <span class="invalid-feedback d-block" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                 @enderror
            </div>

        </div>
        
        <div class="col-12 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group  @error('total') has-danger @enderror">
                <label class="bmd-label-floating">Monto a pagar</label>
                <input value="{{ old('total') }}" autocomplete="off" name="total" type="number" step="0.01" class="form-control">
                @error('total')
                    <span class="invalid-feedback d-block" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                 @enderror
            </div>

        </div>
        
        <div class="col-12 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('porcentaje') has-danger @enderror">
                <label class="bmd-label-floating">Porcentaje</label>
                <input value="{{ old('porcentaje') }}" autocomplete="off" name="porcentaje" type="number" step="0.01" max="100" class="form-control">
                
            </div>

        </div>

        <div class="col-12 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group  @error('fecha_pago') has-danger @enderror">
                <label class="">Fecha del Pago</label>
                <input value="{{ old('fecha_pago') }}" autocomplete="off" name="fecha_pago" type="date" class="form-control">
            </div>
            @error('fecha_pago')
                <span class="invalid-feedback d-block" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>


    </div>

    <div class="row">

        {{-- //TODO: Upload file doesn´t work --}}
        <div class="col-12 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group  @error('pathfile') has-danger @enderror">
                <label class="bmd-label-floating">Comprobante</label>
                <input value="{{ old('pathfile') }}" autocomplete="off" name="pathfile" type="text" value="path/file" class="form-control">
                @error('pathfile')
                    <span class="invalid-feedback d-block" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>

        </div>
        
        <div class="col-12 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group  @error('descripcion') has-danger @enderror">
                <label class="bmd-label-floating">Descripción</label>
                <input value="{{ old('descripcion') }}" autocomplete="off" name="descripcion" type="text" class="form-control">
                @error('descripcion')
                    <span class="invalid-feedback d-block" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>
        </div>

    </div>

    <div class="d-flex justify-content-center mt-3">
        <button class="btn btn-outline-primary btn-round">
            Generar
        </button>
    </div>

</form>
@endsection