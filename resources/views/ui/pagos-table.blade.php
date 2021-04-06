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

                </tr>

            @endforeach
            
        </tbody>
    </table>
</div>