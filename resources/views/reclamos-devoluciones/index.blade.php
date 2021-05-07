@extends('admin.dashboar')

@section('content')
    <div class="d-flex flex-wrap justify-content-center">
        @foreach($recepcionReclamoDevolucion as $rcd)
            <div class="card m-3">

                <div class="card-header d-inline-flex justify-content-around flex-wrap">
                    <h4><strong>Tarea</strong>: {{ $rcd->ProduccionTransito->pivotTable->tarea->nombre }}</h4>
                    <h4><strong>Proveedor</strong>: {{ $rcd->ProduccionTransito->pivotTable->proveedor->nombre }}</h4>
                    <h4><strong>Pais</strong>: {{ $rcd->ProduccionTransito->pivotTable->proveedor->pais }}</h4>
                    <h4><strong>Ciudad</strong>: {{ $rcd->ProduccionTransito->pivotTable->proveedor->ciudad }}</h4>
                    <h4><strong>Provincia</strong>: {{ $rcd->ProduccionTransito->pivotTable->proveedor->provincia }}</h4>
                    @if($rcd->ProduccionTransito->pivotTable->proveedor->distrito)
                        <h4><strong>Distrito</strong>: {{ $rcd->ProduccionTransito->pivotTable->proveedor->distrito }}</h4>
                    @endif
                </div>

                <div class="card-body d-flex justify-content-between">
                    <h5 class="d-flex align-items-center">
                        <a href="{{ route('recepcion-mercancias.index', ['rcdId' => $rcd->id]) }}">
                            <strong>
                                Recepción Mercancía
                            </strong>
                        </a>: 

                        @if($rcd->recepcionMercancia)
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
                        @if($rcd->inspeccionCarga)
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
                        
                        @if($rcd->reclamoDevolucion)
                            <span class="material-icons text-success">
                                done_all
                            </span>

                        @else
                            <span class="material-icons text-danger">
                                clear
                            </span>
                        @endif
                    </h5>

                    {{-- <h6>testtt:</h6>
                    <div>
                        {{$rcd->reclamoDevolucion}}
                    </div> --}}

                    {{-- TODO: CORREGIR ERROR PARA MOSTRAR INFORMACION --}}

                </div>
            </div>
            
        @endforeach
    </div>
        
@endsection

@section('ccs_file')
    <style>
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