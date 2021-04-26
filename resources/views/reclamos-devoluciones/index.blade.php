@extends('admin.dashboar')

@section('content')


    <div class="d-flex flex-wrap justify-content-center">
        @foreach($recepcionReclamoDevolucion as $rcd)
        
            <div class="card m-3">

                <div class="card-header d-inline-flex justify-content-around flex-wrap">
                    <h4><strong>Tarea</strong>: {{ $rcd->ProduccionTransito->pivotTable->tarea->nombre }}</h4>
                    <h4><strong>Proveedor</strong>: {{ $rcd->ProduccionTransito->pivotTable->proveedor->nombre }}</h4>
                </div>

                <div class="card-body">
                    <h5 class="d-flex align-items-center">
                        <a href="{{ route('recepcion-mercancias.index', ['rcdId' => $rcd->id]) }}">
                            <strong>
                                Recepción Mercancía
                            </strong>
                        </a>: 
                        @if($rcd->recepcion_mercancia)
                            <span class="material-icons text-success">
                                done_all
                            </span>

                        @else
                            <span class="material-icons text-danger">
                                clear
                            </span>
                        @endif
                    </h5>

                    <h5 class="d-flex align-items-center">
                        <a href="{{ route('inspeccion-cargas.index', ['rcdId' => $rcd->id]) }}">
                            <strong>
                                Inspección de Carga
                            </strong>
                        </a>: 
                        @if($rcd->inspeccion_carga)
                            <span class="material-icons text-success">
                                done_all
                            </span>

                        @else
                            <span class="material-icons text-danger">
                                clear
                            </span>
                        @endif
                    </h5>

                    <h5 class="d-flex align-items-center">
                        <a href="{{ route('reclamo-devoluciones.index', ['rcdId' => $rcd->id]) }}">
                            <strong>
                                Reclamos Devoluciones
                            </strong>
                        </a>: 
                        @if($rcd->reclamos_devoluciones)
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

        .btn-secondary {
            padding: 0px
        }

        .toast {
            display: flex;
            justify-content: center;
            position: fixed;
            top: 50%;
            left: 10px;
            right: 10px;
            align-items: center;
        }
    </style>
@endsection