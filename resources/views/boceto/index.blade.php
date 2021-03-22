@extends('admin.dashboar')

@section('content')
    <div class="table-responsive">
        <table class="table table-shopping">
            <thead>
                <tr>
                    <th class="text-center">ID</th>
                    <th>Titulo</th>
                    <th class="th-description">Descripción</th>
                    <th class="th-description">Usuario</th>
                    <th class="th-description">Fecha</th>

                </tr>
            </thead>
            <tbody>
                @foreach($bocetos as $boceto)
                    <tr>
                        <td class="">
                            {{ $boceto->id }}
                        </td>
                        <td>
                            {{ $boceto->titulo }}
                        </td>
                        <td>
                            {{ $boceto->descripcion }}
                        </td>
                        <td class="">
                            {{ $boceto->user->name }}
                        </td>
                        <td class="">
                            {{ date('d-m-Y', strtotime($boceto->updated_at)) }}
                        </td>

                    </tr>
                @endforeach
                
            </tbody>
        </table>
    </div>
@endsection