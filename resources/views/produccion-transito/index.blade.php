@extends('admin.dashboar')

@section('content')

<div class="d-flex flex-wrap justify-content-center">
    @foreach($produccionTransitos as $produccionTransito )

        <div class="card m-3">
            <div class="card-header d-inline-flex justify-content-around flex-wrap">
                <h4><strong>Tarea</strong>: {{ $produccionTransito->pivotTable->tarea->nombre }}</h4>
                <h4><strong>Proveedor</strong>: {{ $produccionTransito->pivotTable->proveedor->nombre }}</h4>
            </div>
    
            <div class="card-body ">
                <h5 class="d-flex align-items-center">
                    <strong>Pago Anticipado</strong>: 
                    @if($produccionTransito->pagos_anticipados)
                        <span class="material-icons text-success">
                            done_all
                        </span>

                    @else
                        <span class="material-icons text-danger">
                            clear
                        </span>
                    @endif
                </h5>


                @if($produccionTransito->pagos_anticipados)
                    <h5><strong>Pagado (%)</strong>: 100%</h5>
                @endif

                <h5>
                    <strong>Inicio Producción:</strong>: 
                    @if($produccionTransito->inicio_produccion)
                    <span class="material-icons text-success">
                        done_all
                    </span>

                    @else
                        <span class="material-icons text-danger">
                            clear
                        </span>
                    @endif
                </h5>

                <h5>
                    <strong>Pago de Balance:</strong>: 
                    @if($produccionTransito->pago_balance)
                        <span class="material-icons text-success">
                            done_all
                        </span>

                    @else
                        <span class="material-icons text-danger">
                            clear
                        </span>
                    @endif
                </h5>

                @if($produccionTransito->pago_balance)
                    <h5><strong>Pagado Balance (%): 90%</strong>:  </h5>
                @endif

                <h5>
                    <strong>Transito Nacionalización</strong>: 
                    @if($produccionTransito->transito_nacionalizacion)
                        <span class="material-icons text-success">
                            done_all
                        </span>

                    @else
                        <span class="material-icons text-danger">
                            clear
                        </span>
                    @endif
                </h5>
            </div>
    
        </div>
    @endforeach

</div>   


@endsection

@section('ccs_file')
    <style>
        .card {
            max-width: 300px;
        }
    </style>
@endsection