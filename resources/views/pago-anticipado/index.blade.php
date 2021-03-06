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
    title="Atras"
    >
      <span class="material-icons mr-2">
        keyboard_backspace
      </span>
      Atras
    </a>
    </div>

    @if( count($pagos) > 0 )
        @include('ui.pagos-table', 
                array(
                    'pagos' => $pagos, 
                    'produccion_transito' => $produccionTransito,
                    'route_name' => 'pago-anticipado', 
                    'route_entity' => 'pago_anticipado'
                )
        )
    
    @else
        {{-- Empty view --}}
        @include('ui.nada-para-mostrar')
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


@push('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                if(document.getElementById('toast')) {
                    document.getElementById('toast').style.display = 'none';
                }
            }, 2000);
        });
    </script>
@endpush