@extends('admin.dashboar')

@section('content')
    <div class="d-flex justify-content-between">
        <a
            class="btn btn-outline-primary btn-round"
            href="{{ route('pago-anticipado.create', ['id_produccion_transito' => $produccionTransito->id]) }}"
        >
            <span class="material-icons mr-2">
                add_circle_outline
            </span>
            Registrar Pago
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

    @if( count($pagos) > 0 )
        @include('ui.pagos-table', array('pagos' => $pagos, 'produccion_transito' => $produccionTransito))
    
    @else
        {{-- Empty view --}}
        @include('ui.nada-para-mostrar')
    @endif
@endsection