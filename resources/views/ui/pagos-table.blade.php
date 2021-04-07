<div class="table-responsive">
    <table class="table table-shopping">
        <thead>
            <tr>
                <th><strong>ID</strong></th>
                <th><strong>Titulo</strong></th>
                <th class="th-description"><strong>Monto Total</strong></th>
                <th class="th-description"><strong>%</strong></th>
                <th class="th-description"><strong>Archivo</strong></th>
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
                    <td>
                        {{ $pago->monto_total }}
                    </td>
                    <td class="">
                        {{ $pago->porcentaje }}
                    </td>
                    <td class="">
                        {{ $pago->file_pago }}
                    </td>
                    <td class="">
                        {{ date('d-m-Y', strtotime($pago->fecha_pago)) }}
                    </td>
                    <td class="">
                        {{ $pago->descripcion }}
                    </td>

                    <td>
                        <a href="{{ route('pago-anticipado.edit', ['pago_anticipado' => $pago->id, 'id_produccion_transito' => $produccion_transito->id]) }}" class="btn btn-outline-primary btn-fab btn-fab-mini btn-round">
                            <i class="material-icons">mode_edit</i>
                        </a>

                        <form action="{{ route('pago-anticipado.destroy', ['pago_anticipado' => $pago->id, 'id_produccion_transito' => $produccion_transito->id]) }}" method="POST" style="display: contents;">
                            @csrf
                            @method('delete')
                            <button type="submit" class="btn btn-outline-primary btn-fab btn-fab-mini btn-round"><i class="material-icons">delete</i></button>
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
