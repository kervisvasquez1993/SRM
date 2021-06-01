@extends('admin.dashboar')

@section('content')
<div class="d-flex justify-content-end">
    @include('ui.previous')
</div>
<h4>Agregar Detalle de Compra</h4>
<form class="p-2" method="POST" action="{{ route('compras.store', ['id_proveedor' => $id_proveedor]) }}">

    @csrf
    <input type="hidden" name="id_coordinador" value="{{$id_coordinador}}">
    <div class="row">
        <div class="col col-12 col-sm-12 col-md-6 col-lg-4">
            <input type="hidden" name="proveedor_id" value="{{$id_proveedor}}">
            <div class="form-group @error('name') has-danger @enderror">
                
                <label class="bmd-label-floating">Orden de Compra</label>
                <input value="{{ old('orden_compra') }}" autocomplete="off" name="orden_compra" type="text" class="form-control">
                @error('name')
                    <span class="invalid-feedback d-block" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>
        </div>
      
        <div class="col col-12 col-sm-12 col-md-6 col-lg-4">
            <div class="form-group @error('item') has-danger @enderror">
                <label class="bmd-label-floating">item</label>
                <input value="{{ old('item') }}" autocomplete="off" name="item" type="text" class="form-control">
                    @error('item')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>

        <div class="col col-12 col-sm-12 col-md-6 col-lg-4">
            <div class="form-group @error('registro_salud') has-danger @enderror">
                <label class="bmd-label-floating">registro_salud</label>
                <input value="{{ old('registro_salud') }}" autocomplete="off" name="registro_salud" type="text" class="form-control">
                    @error('registro_salud')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>
        <div class="col col-12 col-sm-12 col-md-6 col-lg-6">
            <div class="form-group @error('cantidad_pcs') has-danger @enderror">
                <label class="bmd-label-floating">cantidad_pcs</label>
                <input value="{{ old('cantidad_pcs') }}" autocomplete="off" name="cantidad_pcs" type="text" class="form-control">
                    @error('cantidad_pcs')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>
        <div class="col col-12 col-sm-12 col-md-6 col-lg-6">
            <div class="form-group @error('total') has-danger @enderror">
                <label class="bmd-label-floating">total</label>
                <input value="{{ old('total') }}" autocomplete="off" name="total" type="text" class="form-control">
                    @error('total')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
            </div>
        </div>
        <div class="col col-12 col-sm-12 col-md-12 col-lg-12">
            <label for="descripcion" class="bmd-label-static">Descripción</label>
            <textarea class="form-control" id="descripcion" name="descripcion" rows="3"></textarea>
        </div>


    <div class="d-flex justify-content-center mt-3">
        <button class="btn btn-outline-primary btn-round">
            Guardar
        </button>
    </div>
  </form>
@endsection


@push('ccs_file')
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
@endpush