@extends('admin.dashboar')

@section('content')

    <div class="d-flex justify-content-between">
        <a
            class="btn btn-outline-primary btn-round"
            href="{{ route('inspeccion-cargas.create', ['rcdId' => $recepcionReclamoDevolucion->id]) }}"
        >
            <span class="material-icons mr-2">
                add_circle_outline
            </span>
            Crear
        </a>

        <a
            class="btn btn-outline-primary btn-round" 
            href="{{ url('/reclamos-devoluciones') }}"
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

    @if( count($inspeccionesCarga) > 0 )
        @include('ui.r-reclamos-devoluciones', array('incidencias' => $inspeccionesCarga, 'rcdId' => $recepcionReclamoDevolucion->id))
    @else
       {{-- Empty view --}}
       @include('ui.nada-para-mostrar') 
    @endif

    @if(Session::has('message'))
        <div id="toast" class="toast alert alert-{{ Session::get('class') }} alert-dismissible fade show" role="alert">
            {{ Session::get('message') }}

            <span class="material-icons ml-2">
                done_all
            </span>

            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
    @endif

@endsection

@section('css')
    <style>
        .toast {
            display: flex;
            justify-content: center;
            position: fixed;
            top: 50%;
            left: 10px;
            right: 10px;
            align-items: center;
        }
    </style>
@endsection