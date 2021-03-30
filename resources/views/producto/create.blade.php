@extends('admin.dashboar')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h3>Crear Producto</h3>

    <a
        class="btn btn-outline-primary btn-round"
        type="button"
        href="{{ route('productos.index', ['id_proveedor' => $id_proveedor] ) }}"
    >
      <span class="material-icons mr-2 text-primary">
        keyboard_backspace
      </span>
      <span class="text-primary">
          Regresar
      </span>
    </a>
</div>


<form class="p-2" method="POST" action="{{ route('productos.store', ['id_proveedor' => $id_proveedor]) }}">

    @csrf

    <div class="row">
        <div class="col col-12 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('name') has-danger @enderror">
                <label class="bmd-label-floating">Nombre del Producto</label>
                <input value="{{ old('name') }}" autocomplete="off" name="name" type="text" class="form-control">
                @error('name')
                    <span class="invalid-feedback d-block" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>
        </div>
      
        <div class="col col-12 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('marca') has-danger @enderror">
                <label class="bmd-label-floating">Marca</label>
                <input value="{{ old('marca') }}" autocomplete="off" name="marca" type="text" class="form-control">
                    @error('marca')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>

        <div class="col col-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('codigo') has-danger @enderror">
                <label class="bmd-label-floating">Código</label>
                <input value="{{ old('codigo') }}" autocomplete="off" name="codigo" type="text" class="form-control">
                    @error('codigo')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>

        <div class="col col-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('name') has-danger @enderror">
                <label class="bmd-label-floating">Código HS</label>
                <input value="{{ old('codigo-hs') }}" autocomplete="off" name="codigo-hs" type="text" class="form-control">
                    @error('codigo-hs')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col col-12 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('descripcion') has-danger @enderror">
                <label class="bmd-label-floating">Descripción</label>
                <input value="{{ old('descripcion') }}" autocomplete="off" name="descripcion" type="text" class="form-control">
                    @error('descripcion')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>

        <div class="col col-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('vida-util') has-danger @enderror">
                <label class="bmd-label-floating">Vida útil</label>
                <input value="{{ old('vida-util') }}" autocomplete="off" name="vida-util" type="text" class="form-control">
                    @error('vida-util')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>

        <div class="col col-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('totalpcs') has-danger @enderror">
                <label class="bmd-label-floating">Total de piezas</label>
                <input value="{{ old('totalpcs') }}" autocomplete="off" name="totalpcs" type="text" class="form-control">
                    @error('totalpcs')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>

        <div class="col col-12 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('pcs-empaque-unitario') has-danger @enderror">
                <label class="bmd-label-floating">Piezas empaque unitario</label>
                <input value="{{ old('pcs-empaque-unitario') }}" autocomplete="off" name="pcs-empaque-unitario" type="text" class="form-control">
                    @error('pcs-empaque-unitario')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>
    </div>

    <div class="row">

        <div class="col col-12 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('pcs-empaque-interno') has-danger @enderror">
                <label class="bmd-label-floating">Piezas empaque interno</label>
                <input value="{{ old('pcs-empaque-interno') }}" autocomplete="off" name="pcs-empaque-interno" type="text" class="form-control">
                    @error('pcs-empaque-interno')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>

        <div class="col col-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('pcs-carton') has-danger @enderror">
                <label class="bmd-label-floating">Piezas carton (cm)</label>
                <input value="{{ old('pcs-carton') }}" autocomplete="off" name="pcs-carton" type="text" class="form-control">
                    @error('pcs-carton')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>

        <div class="col col-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('largo-carton') has-danger @enderror">
                <label class="bmd-label-floating">Largo carton (cm)</label>
                <input value="{{ old('largo-carton') }}" autocomplete="off" name="largo-carton" type="text" class="form-control">
                    @error('largo-carton')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>

        <div class="col col-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('alto-carton') has-danger @enderror">
                <label class="bmd-label-floating">Alto carton (cm)</label>
                <input value="{{ old('alto-carton') }}" autocomplete="off" name="alto-carton" type="text" class="form-control">
                    @error('alto-carton')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>


    </div>

    <div class="row">
        <div class="col col-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('ancho-carton') has-danger @enderror">
                <label class="bmd-label-floating">Ancho carton (cm)</label>
                <input value="{{ old('ancho-carton') }}" autocomplete="off" name="ancho-carton" type="text" class="form-control">
                    @error('ancho-carton')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>

        <div class="col col-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('cbm') has-danger @enderror">
                <label class="bmd-label-floating">CBM</label>
                <input value="{{ old('cbm') }}" autocomplete="off" name="cbm" type="text" class="form-control">
                    @error('cbm')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>

        <div class="col col-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('peso-neto') has-danger @enderror">
                <label class="bmd-label-floating">Peso Neto (kg)</label>
                <input value="{{ old('peso-neto') }}" autocomplete="off" name="peso-neto" type="text" class="form-control">
                    @error('peso-neto')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>

        <div class="col col-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('peso-bruto') has-danger @enderror">
                <label class="bmd-label-floating">Peso Bruto (kg)</label>
                <input value="{{ old('peso-bruto') }}" autocomplete="off" name="peso-bruto" type="text" class="form-control">
                    @error('peso-bruto')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>

       
    </div>

    <div class="row">
        <div class="col col-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('total-cbm') has-danger @enderror">
                <label class="bmd-label-floating">Total CBM</label>
                <input value="{{ old('total-cbm') }}" autocomplete="off" name="total-cbm" type="text" class="form-control">
                    @error('total-cbm')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>

        <div class="col col-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('total-peso-neto') has-danger @enderror">
                <label class="bmd-label-floating">Total Peso Neto (kg)</label>
                <input value="{{ old('total-peso-neto') }}" autocomplete="off" name="total-peso-neto" type="text" class="form-control">
                    @error('total-peso-neto')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>

        <div class="col col-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('total-peso-bruto') has-danger @enderror">
                <label class="bmd-label-floating">Total Peso Bruto (kg)</label>
                <input value="{{ old('total-peso-bruto') }}" autocomplete="off" name="total-peso-bruto" type="text" class="form-control">
                    @error('total-peso-bruto')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>

        <div class="col col-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('total-ctn') has-danger @enderror">
                <label class="bmd-label-floating">Total CTN</label>
                <input value="{{ old('total-ctn') }}" autocomplete="off" name="total-ctn" type="text" class="form-control">
                    @error('total-ctn')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>


    </div>

    <div class="row">
        <div class="col col-6 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('corregido-total-pcs') has-danger @enderror">
                <label class="bmd-label-floating">Corregido Total PCS</label>
                <input value="{{ old('corregido-total-pcs') }}" autocomplete="off" name="corregido-total-pcs" type="text" class="form-control">
                    @error('corregido-total-pcs')
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


@section('ccs_file')
<style>

    .btn {
        height: fit-content;
    }

    @media (max-width: 760px) {
        .col {
            margin-top: 1rem;
        }   
    }

</style>
@endsection