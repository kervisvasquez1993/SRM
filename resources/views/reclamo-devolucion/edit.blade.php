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

    <h4>Editar Inicidencia sobre Reclamo/Devolucion</h4>

    <form method="POST" action="{{ route('reclamo-devoluciones.update', ['reclamo_devolucione' => $reclamoDevolucion->id, 'rcdId' => $rcdId]) }}">
        @method('put')
        @csrf

        <div class="form-container">

            <div class="form-group mr-3  @error('titulo') has-danger @enderror">
                <label class="bmd-label-floating">Titulo</label>
                <input value="{{ $reclamoDevolucion->titulo }}" autocomplete="off" name="titulo" type="text" class="form-control">
                @error('titulo')
                    <span class="invalid-feedback d-block" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                 @enderror
            </div>
    
           
            <div class="form-group  @error('descripcion') has-danger @enderror">
                <label class="bmd-label-floating">Descripción</label>
                <input value="{{ $reclamoDevolucion->descripcion }}" autocomplete="off" name="descripcion" type="text" class="form-control">
                @error('descripcion')
                    <span class="invalid-feedback d-block" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>

        </div>


        <div class="d-flex justify-content-center mt-3">
            <button class="btn btn-outline-primary btn-round">
                Guardar
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