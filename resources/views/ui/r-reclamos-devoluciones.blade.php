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
                @foreach($incidencias as $incidencia)
                    <tr>
                        <td>{{ $incidencia->id }}</td>
                        <td class="td-name">
                            {{ $incidencia->titulo }}
                        </td>
                        <td>
                            {{ $incidencia->descripcion }}
                        </td>
                        <td>
                            {{ date('d-m-Y', strtotime($incidencia->updated_at)) }}
                        </td>
                        <!--TODO: Configure migrations and model to get and set the user -->
                        <td>
                            Pedro Perez
                        </td>

                        <td class="d-flex">
                            <a
                                {{-- href="{{ route('recepcion-mercancias.edit', ['recepcion_mercancia' => $incidencia->id, 'rcdId' => $rcdId]) }}" --}}
                                href='{{ route("$route_name.edit", [ $route_entity => $incidencia->id, "rcdId" => $rcdId]) }}'
                                class="btn btn-outline-primary btn-fab btn-fab-mini btn-round"
                            >
                                <i class="material-icons">mode_edit</i>
                            </a>
    
                            <form 
                                {{-- action="{{ route('recepcion-mercancias.destroy', ['recepcion_mercancia' => $incidencia->id, 'rcdId' => $rcdId]) }}"  --}}
                                action='{{ route("$route_name.destroy", [ $route_entity => $incidencia->id, 'rcdId' => $rcdId]) }}'
                                method="POST" 
                                style="display: contents;"
                            >
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