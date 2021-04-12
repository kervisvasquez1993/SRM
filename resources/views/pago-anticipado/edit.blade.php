@extends('admin.dashboar')
@section('content')
<div class="d-flex justify-content-end">
    <a
        class="btn btn-outline-primary btn-round" 
        href="{{ url()->previous() }}"
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

<form novalidate class="m-2" method="POST" action="{{ route('pago-anticipado.update', [ 'pago_anticipado' => $pagoAnticipado->id, 'id_produccion_transito' => $idProduccionTransito]) }}">
    @method('put')
    @csrf

    <div class="row">
        <div class="col-12 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group  @error('titulo') has-danger @enderror">
                <label class="bmd-label-floating">Titulo</label>
                <input value="{{ $pagoAnticipado->titulo }}" autocomplete="off" name="titulo" type="text" class="form-control">
                @error('titulo')
                    <span class="invalid-feedback d-block" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                 @enderror
            </div>

        </div>
        
        <div class="col-12 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group  @error('total') has-danger @enderror">
                <label class="bmd-label-floating">Total a pagar</label>
                <input value="{{ $pagoAnticipado->monto_total }}" autocomplete="off" name="total" type="number" step="0.01" class="form-control">
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
                <input value="{{ $pagoAnticipado->porcentaje }}" autocomplete="off" name="porcentaje" type="number" step="0.01" max="100" class="form-control">
                
            </div>

        </div>

        {{-- //TODO: Fix the field to set the default value when the form is loaded --}}
        <div class="col-12 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group  @error('fecha_pago') has-danger @enderror">
                <label class="">Fecha del Pago</label>
                  
                {{-- <input value="31-11-2017"  type="date" class="form-control"  pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"> --}}
                
                <input type="date" value="{{date('Y-m-d', strtotime($pagoAnticipado->fecha_pago))}}" name="fecha_pago" class="form-control" id="fecha_pago">
                
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
                <input value="{{ $pagoAnticipado->file_pago }}" autocomplete="off" name="pathfile" type="text" value="path/file" class="form-control">
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
                <input value="{{ $pagoAnticipado->descripcion }}" autocomplete="off" name="descripcion" type="text" class="form-control">
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
            Guardar
        </button>
    </div>

</form>
@endsection