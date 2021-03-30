@extends('admin.dashboar')

@section('content')
    {{-- Buttons: Return and Create --}}
    @include('ui.botones-incidencia')

    
    {{-- Data shown in table --}}
    @if( count( $bocetos ) > 0)
        @include('ui.incidencias-table', array('incidencias' => $bocetos, 'path' => '/bocetos'))

    @else
        
        {{-- Empty view --}}
        @include('ui.nada-para-mostrar')
        
    @endif

    {{-- Modal to Create --}}
    @include(
        'ui.modal-incidencia', 
        array(
            'modalTitle' => 'Crea una incidencia relacionada con la creación del boceto',
            'arte_id' => $arte->id,
            'path' => '/bocetos'
        )
    )

@endsection

@section('script')
    @include('util.incidencias-scripts')
@endsection