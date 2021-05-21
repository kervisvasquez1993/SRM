@extends('admin.dashboar')

@section('content')
    {{-- Create and return buttons --}}
    @include('ui.botones-incidencia')

    @if( count($validacionBocetos) > 0 )
        {{-- Table to show the data --}}
        @include('ui.incidencias-table', array('incidencias' => $validacionBocetos, 'path' => '/validacion-bocetos'))

    @else
        {{-- Empty view --}}
        @include('ui.nada-para-mostrar')
    @endif

    {{-- Modal to Create --}}
    @include(
        'ui.modal-incidencia', 
        array(
            'modalTitle' => 'Crea una incidencia relacionada con la validación del boceto',
            'arte_id' => $arte->id,
            'path' => '/validacion-bocetos'
        )
    )
@endsection

@push('scripts')
    @include('util.incidencias-scripts')
@endpush