@extends('admin.dashboar')

@section('content')

<div class="d-flex justify-content-end">
    <a
        class="btn btn-outline-primary btn-round" 
        href="{{ url()->previous() }}"
        data-toggle="tooltip" 
        data-placement="left" 
        title="Atras"
    >
    <span class="material-icons mr-2">
        keyboard_backspace
    </span>
        Atras
    </a>
</div>

<h4>Editar Pago de Balance</h4>

<form novalidate class="m-2" method="POST" action="{{ route('pago-balance.update', ['pago_balance' => $pagoBalance->id, 'id_produccion_transito' => $idProduccionTransito]) }}">
    @method('put')
    @csrf

    <div class="row">
        <div class="col-12 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group  @error('titulo') has-danger @enderror">
                <label class="bmd-label-floating">Titulo</label>
                <input value="{{ $pagoBalance->titulo }}" autocomplete="off" name="titulo" type="text" class="form-control">
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
                <input value="{{ $pagoBalance->monto_total }}" autocomplete="off" name="total" type="number" step="0.01" class="form-control">
                @error('total')
                    <span class="invalid-feedback d-block" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                 @enderror
            </div>

        </div>

        <div class="col-12 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group  @error('fecha_pago') has-danger @enderror">
                <label class="">Fecha del Pago</label>
                <input value="{{ $pagoBalance->fechaPago }}" autocomplete="off" name="fecha_pago" type="date" class="form-control">
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
                <input value="{{ $pagoBalance->file_pago }}" autocomplete="off" name="pathfile" type="text" value="path/file" class="form-control">
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
                <input value="{{ $pagoBalance->descripcion }}" autocomplete="off" name="descripcion" type="text" class="form-control">
                @error('descripcion')
                    <span class="invalid-feedback d-block" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>
        </div>

        <div class="form-group form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" name="pago_completo" {{ $pagoBalance->pago_completo ? "checked" : ''}}>
                ¿Es el pago completo?
                <span class="form-check-sign">
                    <span class="check"></span>
                </span>
            </label>
        </div>

    </div>

    <div class="d-flex justify-content-center mt-3">
        <button class="btn btn-outline-primary btn-round">
            Guardar
        </button>
    </div>

</form>

@endsection