@extends('admin.dashboar')

@section('content')
    <div class="d-flex justify-content-between">
        <a
            class="btn btn-outline-primary btn-round"
            href=""
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

    @if( count($transitos) > 0 )
        <div>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th><strong>ID</strong></th>
                            <th class="th-description">Titulo</th>
                            <th class="th-description">Descripcion</th>
                            <th class="th-description">Fecha</th>
                            <th class="th-description">Usuario</th>    
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        @foreach($transitos as $transito)
                            <tr>
                                <td>{{ $transito->id }}</td>
                                <td class="td-name">
                                    {{ $transito->titulo }}
                                </td>
                                <td>
                                    {{ $transito->descripcion }}
                                </td>
                                <td>
                                    {{ date('d-m-Y', strtotime($transito->created_at)) }}
                                </td>
                                <td>
                                    Pedro Perez
                                </td>
        
                            </tr>
                            
                        @endforeach
                    </tbody>

                </table>
            </div>

        </div>

    @else
        {{-- Empty view --}}
        @include('ui.nada-para-mostrar')
    @endif
@endsection