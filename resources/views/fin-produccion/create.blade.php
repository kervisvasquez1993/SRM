@extends('admin.dashboar')

@section('content')
    <div class="d-flex justify-content-end">
        <a
            class="btn btn-outline-primary btn-round" 
            href="{{ url('/produccion-transito') }}"
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

    <h4>Crear una incidencia sobre Fin de Produccion</h4>

    <form method="POST" action="{{ route('fin-produccion.store', ['id_produccion_transito' => $idProduccionTransito]) }}">
        @csrf

        <div class="form-container">

            <div class="form-group mr-3  @error('titulo') has-danger @enderror">
                <label class="bmd-label-floating">Titulo</label>
                <input value="{{ old('titulo') }}" autocomplete="off" name="titulo" type="text" class="form-control">
                @error('titulo')
                    <span class="invalid-feedback d-block" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                 @enderror
            </div>
    
           
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


        <div class="d-flex justify-content-center mt-3">
            <button class="btn btn-outline-primary btn-round">
                Crear
            </button>
        </div>
        

    </form>
@endsection

@section('css')

    <style>
        .form-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        @media (min-width: 600px) {
            .form-group {
                width: 40%
            }
       }

        @media (max-width: 600px) {
            .form-group {
                width: 100%
            }
        }
    </style>
    
@endsection