@extends('admin.dashboar')

@section('content')

    {{-- Create and return buttons --}}
    @include('ui.botones-incidencia')

    @if ( count( $confirmacionProveedores ) > 0 )
        {{-- Table to show the data --}}
        @include('ui.incidencias-table', array('incidencias' => $confirmacionProveedores, 'path' => '/confirmacion-proveedor'))

    @else
        {{-- Empty view --}}
        @include('ui.nada-para-mostrar')
    @endif

    {{-- Modal to Create --}}
    @include(
        'ui.modal-incidencia', 
        array(
            'modalTitle' => 'Crea una incidencia relacionada con la Confirmación de Proveedor',
            'arte_id' => $arte->id,
            'path' => '/confirmacion-proveedor'
        )
    )

@endsection

@section('script')
    @include('util.incidencias-scripts')
@endsection