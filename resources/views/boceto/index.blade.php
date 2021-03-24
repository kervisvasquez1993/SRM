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

    @if( count( $bocetos ) > 0)
        <div class="table-responsive">
            <table class="table table-shopping">
                <thead>
                    <tr>
                        <th class="text-center"><strong>ID</strong></th>
                        <th><strong>Titulo</strong></th>
                        <th class="th-description"><strong>Descripción</strong></th>
                        <th class="th-description"><strong>Usuario</strong></th>
                        <th class="th-description"><strong>Fecha</strong></th>
                        <th></th>

                    </tr>
                </thead>
                <tbody id="tbody">
                    @foreach($bocetos as $boceto)
                        <tr id="{{ $boceto->id }}">
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

                            <td>
                                <span id="{{ $boceto->id }}" onclick="setBocetoAttribute({{ $boceto }})" class="material-icons pointer" data-toggle="modal" data-target="#deleteModal">
                                    delete_forever
                                </span>
                            </td>

                        </tr>

                        {{-- Modal to Delete --}}
                        @include('ui.borrar-incidencia', array('boceto_id' => $boceto->id))
                    @endforeach
                    
                </tbody>
            </table>
        </div>

    @else
        
        {{-- Empty view --}}
        @include('ui.nada-para-mostrar')
        
    @endif

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

        // Set the Boceto id using a data attribute
        function setBocetoAttribute( boceto ) {
            const modal = document.getElementById('deleteModal');
            modal.setAttribute('data-boceto', boceto.id);
        }

        // Guardar para crear una incidencia
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

                    if ( resp.status === 200 ) {
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

                    }

                });

            }
        }

        // Eliminar una incidencia
        function elimiarIncidencia( boceto ) {
            const modal = document.getElementById('deleteModal')
            const bocetoId = modal.dataset.boceto;

            axios.post(`/bocetos/${ bocetoId }`, 
            { 
                bocetoId ,  
                _method: 'delete' 
            }).then(resp => { 
                
                if ( resp.status === 200 ) {
                    const tbody = document.getElementById('tbody');
                    const tr = document.getElementById(bocetoId);

                    tbody.removeChild(tr);

                    // Hide Modal
                    $(`#deleteModal`).modal('hide')

                    
                    const childTrs = tbody.childNodes;
                    if ( childTrs.length <= 1 ) {
                        location.reload();
                    }


                }


            });
        }
     </script>
@endsection