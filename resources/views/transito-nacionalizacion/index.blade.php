@extends('admin.dashboar')

@section('content')
    <div class="d-flex justify-content-between">
        <a
            class="btn btn-outline-primary btn-round"
            href="{{ route('transito-nacionalizacion.create', ['id_produccion_transito' => $produccionTransito->id]) }}"
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
            title="Atras"
        >
            <span class="material-icons mr-2">
                keyboard_backspace
            </span>
            Atras
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
                                <!--TODO: Configure migrations and model to get and set the user -->
                                <td>
                                    {{ $transito->user->name }}
                                </td>

                                <td class="d-flex">
                                    <a
                                        href="{{ route('transito-nacionalizacion.edit', [ 'transito_nacionalizacion' => $transito->id, "id_produccion_transito" => $produccionTransito->id]) }}"
                                        class="btn btn-outline-primary btn-fab btn-fab-mini btn-round"
                                    >
                                        <i class="material-icons">mode_edit</i>
                                    </a>
            
                                    <form action='{{ route("transito-nacionalizacion.destroy", [ 'transito_nacionalizacion' => $transito->id, 'id_produccion_transito' => $produccionTransito->id]) }}' method="POST" style="display: contents;">
                                        @method('delete')
                                        @csrf
                                        <button type="submit" class="btn btn-outline-primary btn-fab btn-fab-mini btn-round ml-2"><i class="material-icons">delete</i></button>
                                    </form>
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