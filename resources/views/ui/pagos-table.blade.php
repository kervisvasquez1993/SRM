<div class="table-responsive">
    <table class="table table-shopping">
        <thead>
            <tr>
                <th><strong>ID</strong></th>
                <th><strong>Titulo</strong></th>
                <th class="th-description text-center"><strong>Monto Total</strong></th>
                @if(Request::is('pago-anticipado'))
                    <th class="th-description"><strong>%</strong></th>
                @endif
                <th class="th-description"><strong>Archivo</strong></th>
                @if( Request::is('pago-balance') )
                    <th class="th-description text-center"><strong>Pago Completo</strong></th>
                @endif
                <th class="th-description"><strong>Fecha Pago</strong></th>
                <th class="th-description"><strong>Descripción</strong></th>
                <th></th>
            </tr>
        </thead>
        <tbody id="tbody">
            @foreach($pagos as $pago)
                <tr id="{{ $pago->id }}">
                    <td class="">
                        {{ $pago->id }}
                    </td>
                    <td>
                        {{ $pago->titulo }}
                    </td>
                    <td class="text-center">
                        {{ $pago->monto_total }}
                    </td>
                    @if(Request::is('pago-anticipado'))
                        <td class="">
                            {{ $pago->porcentaje }}
                        </td>
                    @endif
                    <td class="">
                        {{ $pago->file_pago }}
                    </td>

                    @if( Request::is('pago-balance') )

                        <td class="text-center">

                            @if($pago->pago_completo)
                                <span class="material-icons text-success">
                                    check_circle
                                </span>
    
                            @else   
                                <span class="material-icons text-danger">
                                    highlight_off
                                </span>
                            @endif
                        </td>
    
                    @endif
                    <td class="">
                        {{ date('d-m-Y', strtotime($pago->fecha_pago)) }}
                    </td>
                    <td class="">
                        {{ $pago->descripcion }}
                    </td>

                    <td class="d-flex">
                        <a href='{{ route("$route_name.edit", [ $route_entity => $pago->id, "id_produccion_transito" => $produccion_transito->id]) }}' 
                            class="btn btn-outline-primary btn-fab btn-fab-mini btn-round"
                        >
                            <i class="material-icons">mode_edit</i>
                        </a>

                        <form action='{{ route("$route_name.destroy", [ $route_entity => $pago->id, 'id_produccion_transito' => $produccion_transito->id]) }}' method="POST" style="display: contents;">
                            @method('delete')
                            @csrf
                            <button type="submit" class="btn btn-outline-primary btn-fab btn-fab-mini btn-round ml-2"><i class="material-icons">delete</i></button>
                        </form>
                    </td>

                </tr>

            @endforeach
            
        </tbody>
    </table>

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
</div>
