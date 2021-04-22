@extends('admin.dashboar')

@section('content')

<div class="d-flex flex-wrap justify-content-center wrapper-card">
   
    @foreach($produccionTransitos as $produccionTransito )
    @php
    $contador = 0 ;
@endphp
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
                        {{$contador++}}
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
                            {{$contador++}}
                        </span>

                    @else
                        <span class="material-icons text-danger">
                            clear
                        </span>

                        <div class="d-flex text-primary pointer ml-2 align-items-center">

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
                    <a href="{{ route('pago-balance.index', ['produccionTransitoId' =>  $produccionTransito->id]) }}"><strong>Pago de Balance:</strong></a>:
                    @if($produccionTransito->pago_balance)
                        <span class="material-icons text-success">
                            done_all
                            {{$contador++}}
                            
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
                    <a href="{{ route('fin-produccion.index', ['produccionTransitoId' =>  $produccionTransito->id]) }}"><strong>Fin de Producción</strong></a>:
                    @if($produccionTransito->transito_nacionalizacion)
                        <span class="material-icons text-success">
                            done_all
                            {{$contador++}}
                        </span>

                    @else
                        <span class="material-icons text-danger">
                            clear
                        </span>
                    @endif
                </h5>

                <h5>
                    <a href="{{ route('transito-nacionalizacion.index', ['produccionTransitoId' =>  $produccionTransito->id]) }}">
                        <strong>Transito Nacionalización</strong>
                    </a>:
                    @if($produccionTransito->transito_nacionalizacion)
                        <span class="material-icons text-success">
                            done_all
                            {{$contador++}}
                        </span>

                    @else
                        <span class="material-icons text-danger">
                            clear
                        </span>
                    @endif
                </h5>
                @php
                    $disabled = 'disabled';
                    $bgAlert = 'bg-danger';
                @endphp
                @if($contador >= 5)
                    @php
                    $disabled = '';
                    $bgAlert  = 'bg-success'; 
                    @endphp
                
                @endif
                
                <h5 class="py-1 d-flex  justify-content-start align-items-center">  
                                     
                     <span class="form-check d-flex justify-content-start">
                        <div class="circle {{$bgAlert}} mx-1"></div>
                        <a href="">
                            Salida de Puerto Origen :
                        </a>
                        
                            <label class="form-check-label mx-3">
                              <input class="form-check-input" type="checkbox" value="{{$produccionTransito->id}}" {{$disabled}} {{$produccionTransito->salida_puero_origen ? 'checked' : ''}}>
                              <span class="form-check-sign">
                                <span class="check"></span>
                              </span>
                            </label>
                            
                    </span>
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
        .circle{
            width:20px;
            height: 20px;
            border-radius: 50%;
        }
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

@section('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                if(document.getElementById('toast')) {
                    document.getElementById('toast').style.display = 'none';
                }
            }, 2000);
        });  
        cargarEventListener();

        function cargarEventListener()
        {
            let wrapperCard = document.querySelector('.wrapper-card'),
                card        = document.querySelectorAll('.card'),
                cardArray   = Array.from(card);
                cardArray.forEach(element => {
                    let newElement      = element.querySelectorAll('.material-icons')
                       let disableButon = 'vacio'
                       let arrayEle = Array.from(newElement)
                       console.log('=======**********=========')

                       console.log(disableButon)
                       console.log(arrayEle)
                       
                       
                    
                })
                
                
            
            wrapperCard.addEventListener('click', function(e){
                if(e.target.classList.contains('form-check-input'))
                {
                    let checkOut = e.target.checked;
                    let csrfToken = document.head.querySelector("[name~=csrf-token][content]").content; 
                    
                    
                    
                    if(checkOut)
                    {
                        let id = e.target.value
                        fetch(`/salida-puerto-origen/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRF-TOKEN': csrfToken
                            }
                        })
                        .then(response => response.json())
                        .then( data => console.log(data) )
                        .catch(e => console.log(e))                      
                    }
                    else{
                        e.target.checked = true

                    }
                }
                
            })
        }

    </script>
@endsection
