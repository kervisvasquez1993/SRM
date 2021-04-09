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
                    <a href="{{ route('pago-anticipado.index', ['produccionTransitoId' =>  $produccionTransito->id]) }}"><strong>Pago Anticipado</strong></a>: 
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
                    <h5>
                        <strong>Pagado (%)</strong>: 
                        100%
                    </h5>
                @endif

                <h5 class="d-flex">
                    <a href="{{ route('inicio-produccion.index', ['produccionTransitoId' =>  $produccionTransito->id]) }}"><strong>Inicio Producción:</strong></a>: 
                    @if($produccionTransito->inicio_produccion)
                        <span class="material-icons text-success">
                            done_all
                        </span>

                    @else
                        <span class="material-icons text-danger">
                            clear
                        </span>

                        <div class="d-flex text-primary pointer ml-2 align-items-center">
                            
                            {{-- <a href="{{ route('ProduccionTransito.iniciarProd', ['id' => $produccionTransito->id]) }}">
                                <span class="material-icons">
                                    security_update_good
                                </span>
                                <small class="iniciar-prod font-weight-light">
                                    Iniciar
        
                                </small>
                            </a> --}}


                            <form action="{{ route('ProduccionTransito.iniciarProd', ['id' => $produccionTransito->id]) }}" method="POST" style="display: contents;">
                                @csrf
                                @method('put')
                                <button class="btn btn-secondary btn-prod text-primary">
                                    <span class="material-icons mr-1">
                                        security_update_good
                                    </span>
                                    <small class="iniciar-prod font-weight-light">
                                        Iniciar
            
                                    </small>
                                </button>
                            </form>
                        </div>
                    @endif
                    

                </h5>

                <h5>
                    <a href=""><strong>Pago de Balance:</strong></a>: 
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
                    <h5>
                        <strong>Pagado Balance (%)</strong>:
                        90%
                    </h5>
                @endif

                <h5>
                    <a href=""><strong>Fin de Producción</strong></a>: 
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

                <h5>
                    <a href=""><strong>Transito Nacionalización</strong></a>: 
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


@endsection

@section('ccs_file')
    <style>
        .card {
            max-width: 300px;
        }

        .iniciar-prod {
            margin-left: -5px
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

@section('script')
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                if(document.getElementById('toast')) {
                    document.getElementById('toast').style.display = 'none';
                }
            }, 2000);
        });
    </script>
@endsection