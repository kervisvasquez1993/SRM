@extends('admin.dashboar')

@section('content')

    <div class="d-flex justify-content-between">
        <a
            class="btn btn-outline-primary btn-round"
            href="{{ route('recepcion-mercancia.create', ['rcdId' => $recepcionReclamoDevolucion->id]) }}"
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

    @if( count($recepcionesMercancia) > 0 )
        @include('ui.r-reclamos-devoluciones', array('incidencias' => $recepcionesMercancia))
    @else
       {{-- Empty view --}}
       @include('ui.nada-para-mostrar') 
    @endif

@endsection