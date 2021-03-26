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
            @foreach($incidencias as $incidencia)
                <tr id="{{ $incidencia->id }}">
                    <td class="">
                        {{ $incidencia->id }}
                    </td>
                    <td>
                        {{ $incidencia->titulo }}
                    </td>
                    <td>
                        {{ $incidencia->descripcion }}
                    </td>
                    <td class="">
                        {{ $incidencia->user->name }}
                    </td>
                    <td class="">
                        {{ date('d-m-Y', strtotime($incidencia->updated_at)) }}
                    </td>

                    <td>
                        <span 
                            id="icon-delete-{{ $incidencia->id }}" 
                            onclick="setIncidenciaAttribute({{ $incidencia }})" 
                            class="material-icons pointer" 
                            data-toggle="modal" 
                            data-target="#deleteModal"
                        >
                            delete_forever
                        </span>
                    </td>

                </tr>

                {{-- Modal to Delete --}}
                @include('ui.borrar-incidencia', array('id' => $incidencia->id, 'path' => $path))
            @endforeach
            
        </tbody>
    </table>
</div>