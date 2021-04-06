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
                        <a href="{{ route('pago-anticipado.create') }}" class="btn btn-outline-primary btn-fab btn-fab-mini btn-round">
                            <i class="material-icons">mode_edit</i>
                        </a>

                        {{-- <a href="{{ route('pago-anticipado.destroy', $pago->id) }}" class="btn btn-outline-primary btn-fab btn-fab-mini btn-round">
                            <i class="material-icons">delete</i>
                        </a> --}}

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
</div>