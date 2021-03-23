@extends('admin.dashboar')

@section('content')
    {{-- Buttons: Return and Create --}}
    <div class="d-flex justify-content-between">
        <button
        class="btn btn-outline-primary btn-round"
        data-toggle="modal" 
        data-target="#CreateModal"
        >
          <span class="material-icons mr-2" data-toggle="modal" data-target="#loginModal">
            add_circle_outline
          </span>
          Crear
        </button>

        <a
        class="btn btn-outline-primary btn-round" 
        href="{{ url('/artes') }}"
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
    {{-- Data shown in table --}}
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
            <tbody id="tbody">
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

    {{-- Modal to Create --}}
    @include(
        'ui.modal-incidencia', 
        array(
            'modalTitle' => 'Crea una incidencia relacionada con la creación del boceto',
            'arte_id' => $arte->id
        )
    )
@endsection

@section('script')
    <script>
        function guardarIncidencia( arte ) {
            const titulo = document.getElementById('titulo').value.trim();
            const descripcion = document.getElementById('descripcion').value.trim();

            if ( titulo !== '' && descripcion !== '' ) {
                console.log('DESDE SCRIPT', titulo, descripcion)
                const params = {
                    titulo,
                    descripcion,
                    arte
                };
                
                axios.post('/bocetos', 
                { params }
                ).then( resp => {
                    // Hide Modal
                    $(`#CreateModal`).modal('hide')

                    const tbody = document.getElementById('tbody');
                    const tr = document.createElement('tr')
                    const date = new Date( resp.data.boceto.updated_at );
                    const month = (date.getMonth() + 1 ) < 9 ? `0${ date.getMonth() + 1  }` : `${ date.getMonth() + 1  }`;

                    // Create the new row
                    tr.innerHTML = `
                                <td class="">
                                    ${ resp.data.boceto.id }
                                </td>
                                <td>
                                    ${ resp.data.boceto.titulo }
                                </td>
                                <td>
                                    ${ resp.data.boceto.descripcion }
                                </td>
                                <td class="">
                                    ${ resp.data.user.name }
                                </td>
                                <td class="">
                                    ${ date.getDate() }-${ month }-${ date.getFullYear() }
                                </td>
                    `;
                    // Insert the new element to the DOM
                    tbody.appendChild(tr);
                });

            }
        }
    </script>
@endsection