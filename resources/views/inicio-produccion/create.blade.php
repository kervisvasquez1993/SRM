@extends('admin.dashboar')

@section('content')

    <form class="form p-4" method="POST" action="{{ route('inicio-produccion.store', ['id_produccion_transito' => $produccionTransito->id]) }}">
        @csrf
    
        <h3 class="ml-4 mb-3">Crea un incidencia relacionada con el inicio de producción</h3>  

        <div class="form-group titulo-input  @error('titulo') has-danger @enderror">
            <label class="bmd-label-floating">Titulo</label>
            <input value="{{ old('titulo') }}" autocomplete="off" name="titulo" type="text" class="form-control">
            @error('titulo')
                <span class="invalid-feedback d-block" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
                @enderror
        </div>

        <div class="form-group titulo-input  @error('descripcion') has-danger @enderror">
            <label class="bmd-label-floating">Descripción</label>
            <input value="{{ old('descripcion') }}" autocomplete="off" name="descripcion" type="text" class="form-control">
            @error('descripcion')
                <span class="invalid-feedback d-block" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="d-flex justify-content-center mt-3">
            <button class="btn btn-outline-primary btn-round">
                Crear
            </button>
        </div>
    </form>


@endsection


@section('css')
    <style>

        .form {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        @media( min-width: 700px) {
            .titulo-input {
                width: 50%;
            }
        }

    </style>
@endsection