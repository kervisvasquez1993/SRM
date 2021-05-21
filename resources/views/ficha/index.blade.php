@extends('admin.dashboar')

@section('content')

    {{-- Create and return buttons --}}
    @include('ui.botones-incidencia')

    @if( count($fichas) > 0 )
        {{-- Table to show the data --}}
        @include('ui.incidencias-table', array('incidencias' => $fichas, 'path' => '/fichas'))

    @else
        {{-- Empty view --}}
        @include('ui.nada-para-mostrar')
    @endif

    {{-- Modal to Create --}}
    @include(
        'ui.modal-incidencia', 
        array(
            'modalTitle' => 'Crea una incidencia relacionada con la creación de fichas',
            'arte_id' => $arte->id,
            'path' => '/fichas'
        )
    )

@endsection


@push('scripts')
    @include('util.incidencias-scripts')
@endpush