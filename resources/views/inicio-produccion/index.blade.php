@extends('admin.dashboar')

@section('content')
    <div class="d-flex justify-content-between">
        <a
            class="btn btn-outline-primary btn-round"
            href="{{ route('inicio-produccion.create', ['id_produccion_transito' => $produccionTransito->id]) }}"
        >
            <span class="material-icons mr-2">
                add_circle_outline
            </span>
            Crear
        </a>

    <a
        class="btn btn-outline-primary btn-round" 
        href="{{ url('/produccion-transito') }}"
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

    @if( count($inicioProducciones) > 0 )
        @include('ui.incidencias-table', array('incidencias' => $inicioProducciones, 'path' => '/inicio-produccion'))
    
    @else
        {{-- Empty view --}}
        @include('ui.nada-para-mostrar')
    @endif
@endsection

@section('script')
    @include('util.incidencias-scripts')
@endsection