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
                <tr>
                    <td class="">
                        1
                    </td>
                    <td>
                        Titulo de la incidencia
                    </td>
                    <td>
                        Esta es la descripcion de la incidencia en el boceto
                    </td>
                    <td class="">
                       Pedro Perez
                    </td>
                    <td class="">
                        20-03-2021
                    </td>

                </tr>
                
            </tbody>
        </table>
    </div>
@endsection