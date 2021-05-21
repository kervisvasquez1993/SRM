@extends('admin.dashboar')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h3>Editar Producto</h3>

   
</div>
<form class="p-2" method="POST"  action="{{ route('productos.update', ['producto'=> $producto->id]) }}"  >
    @method('put') 
    @csrf
    <input type="hidden" name="proveedor_id" value="{{$producto->proveedor_id}}">
    <div class="row">
        <div class="col col-12 col-sm-6 col-md-3 col-lg-3">
            <div class="form-group @error('name') has-danger @enderror">
                <label class="bmd-label-floating">Nombre del Producto</label>
                <input  autocomplete="off" name="name" type="text" class="form-control" value="{{$producto->product_name}}" >
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
                <input autocomplete="off" name="marca" type="text" class="form-control" value="{{$producto->brand}}">
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
                <input autocomplete="off" name="codigo" type="text" class="form-control" value="{{$producto->product_code}}">
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
                <input autocomplete="off" name="codigo-hs" type="text" class="form-control" value="{{$producto->hs_code}}">
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
                <input autocomplete="off" name="descripcion" type="text" class="form-control" value="{{$producto->description}}">
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
                <input autocomplete="off" name="vida-util" type="text" class="form-control" value="{{$producto->shelf_life}}">
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
                <input autocomplete="off" name="totalpcs" type="text" class="form-control" value="{{$producto->total_pcs}}">
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
                <input autocomplete="off" name="pcs-empaque-unitario" type="text" class="form-control" value="{{$producto->pcs_unit}}">
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
                <input autocomplete="off" name="pcs-empaque-interno" type="text" class="form-control" value="{{$producto->pcs_inner_box}}">
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
                <input autocomplete="off" name="pcs-carton" type="text" class="form-control" value="{{$producto->pcs_ctn}}">
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
                <input autocomplete="off" name="largo-carton" type="text" class="form-control" value="{{$producto->ctn_packing_size_l}}">
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
                <input autocomplete="off" name="alto-carton" type="text" class="form-control" value="{{$producto->ctn_packing_size_h}}">
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
                <input autocomplete="off" name="ancho-carton" type="text" class="form-control" value="{{$producto->ctn_packing_size_w}}">
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
                <input autocomplete="off" name="cbm" type="text" class="form-control" value="{{$producto->cbm}}">
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
                <input autocomplete="off" name="peso-neto" type="text" class="form-control" value="{{$producto->n_w_ctn}}">
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
                <input autocomplete="off" name="peso-bruto" type="text" class="form-control" value="{{$producto->g_w_ctn}}">
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
                <input autocomplete="off" name="total-cbm" type="text" class="form-control" value="{{$producto->total_cbm}}">
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
                <input autocomplete="off" name="total-peso-neto" type="text" class="form-control" value="{{$producto->total_n_w}}">
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
                <input autocomplete="off" name="total-peso-bruto" type="text" class="form-control" value="{{$producto->total_g_w}}">
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
                <input autocomplete="off" name="total-ctn" type="text" class="form-control" value="{{$producto->total_ctn}}">
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
                <input autocomplete="off" name="corregido-total-pcs" type="text" class="form-control" value="{{$producto->corregido_total_pcs}}">
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