@extends('admin.dashboar')

@section('content')

<div class="d-flex flex-wrap justify-content-center wrapper-card">
    
    @php
        $array_user           = array();
        $array_empresa        = array();
        $array_empresa_nombre = array();
    @endphp
    @foreach($produccionTransitos as $produccionTransito )
       @php
            $user = $produccionTransito->pivotTable->tarea->usuarios->name;
            $empresa = $produccionTransito->pivotTable->proveedor->pais;
            $nombre_empresa = $produccionTransito->pivotTable->proveedor->nombre;
            array_push($array_empresa, $empresa);
            array_push($array_user, $user);       
            array_push($array_empresa_nombre, $nombre_empresa);       
                
       @endphp    
    @endforeach
    @php
        $numero = 0;
        $array_user_unico = array_unique($array_user);
        $array_empresa_unico = array_unique($array_empresa);
        $array_empresa_nombre_unuci = array_unique($array_empresa_nombre);
    @endphp
    

   
       


    <div class="container">
        <div class="row">      
           
            <div  class="menu_iconos btn btn-sm" data-filter="all">
                Todos
            </div>     
            @foreach ($array_user_unico as $item)
            <div  class="menu_iconos btn btn-sm" data-filter="{{$item}}">
                {{$item}}
            </div>
            @endforeach     
            @foreach ($array_empresa_unico as $item)
            <div  class="menu_iconos btn btn-sm" data-filter="{{$item}}">
                {{$item}}
            </div>
            @endforeach  
            @foreach ($array_empresa_nombre_unuci as $item)
            <div  class="menu_iconos btn btn-sm" data-filter="{{$item}}">
                {{$item}}
            </div>
            @endforeach       
        </div>
     </div>
    <div class="filtro-container d-flex flex-wrap justify-content-betwen ">
       @foreach($produccionTransitos as $produccionTransito )
        @php
        $contador = 0 ;
        $numero
        @endphp
        @if($produccionTransito->pivotTable->tarea->usuarios->name == Auth::user()->name || Auth::user()->rol == 'coordinador' || Auth::user()->rol == 'logistica')
        <div class="card filtr-item w-350 m-5" data-category="{{$produccionTransito->pivotTable->tarea->usuarios->name}},{{$produccionTransito->pivotTable->proveedor->pais}},{{$produccionTransito->pivotTable->proveedor->nombre}}">
                  <div class="card-body  m3 p-3 d-flex justify-content-between flex-wrap">
                     <div class="p-3">
                     <h5 class="d-flex align-items-center">
                        <a  @if(Auth::user()->rol == 'comprador' || Auth::user()->rol == 'coordinador')  href="{{ route('pago-anticipado.index', ['produccionTransitoId' =>  $produccionTransito->id]) }}"  else  href="#" onclick="deshabilitar(this)" @endif>
                        <strong>Pago Anticipado</strong></a>:
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
                     </div>
                     @if($produccionTransito->pagos_anticipados)
                     <div class="p-3">
                     <h5>
                        <strong>Pagado (%)</strong>:
                        100%
                     </h5>
                     </div>
                     @endif
                        <div class="p-3">
                            <h5 class="d-flex">
                              <a  @if(Auth::user()->rol == 'comprador' || Auth::user()->rol == 'coordinador') href="{{ route('inicio-produccion.index', ['produccionTransitoId' =>  $produccionTransito->id]) }}"  else { href="#" onclick="deshabilitar(this)" @endif>
                                        <strong>Inicio Producción:</strong></a>:
                                      
                                        @if($produccionTransito->inicioProduccion)
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
                        </div>
                    <div class="p-3">
                        <h5>
                           <a  @if(Auth::user()->rol == 'comprador' || Auth::user()->rol == 'coordinador' ) href="{{ route('pago-balance.index', ['produccionTransitoId' =>  $produccionTransito->id]) }}"  else { href="#" onclick="deshabilitar(this)" @endif>
                           <strong>Pago de Balance:</strong></a>:
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
                    </div>
    
                       @if($produccionTransito->pago_balance)
                       <div class="p-3">    
                        <h5>
                        <strong>Pagado Balance (%)</strong>:
                          90%
                        </h5>
                       </div>
                       @endif
                     <div class="p-3">
                       <h5>
                         <a  @if(Auth::user()->rol == 'comprador' || Auth::user()->rol == 'coordinador') href="{{ route('fin-produccion.index', ['produccionTransitoId' =>  $produccionTransito->id]) }}"  else { href="#" onclick="deshabilitar(this)" @endif>
                         <strong>Fin de Producción</strong></a>:
                         @if($produccionTransito->finProduccion)
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
                     </div>
                     <div class="p-3">
                        <h5>
                           <a  @if(Auth::user()->rol == 'logistica' || Auth::user()->rol == 'coordinador') href="{{ route('transito-nacionalizacion.index', ['produccionTransitoId' =>  $produccionTransito->id]) }}" else { href="#" onclick="deshabilitar(this)" @endif>
                           
                              <strong>Transito Nacionalización</strong>
                           </a>:
                           @if($produccionTransito->transitosNacionalizacion)
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
                     </div>
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
                        <div class="p-3">
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
                <div class="d-flex flex-wrap">
                   <button class="btn btn-secundary  btn-sm" data-toggle="collapse" data-target="#collapseOne{{$produccionTransito->id}}" aria-expanded="true" aria-controls="collapseOne{{$produccionTransito->id}}">
                    Detalle del Proveedor
                   </button>
                   <button class="btn btn-secundary  btn-sm collapsed" data-toggle="collapse" data-target="#collapseTwo{{$produccionTransito->id}}" aria-expanded="false" aria-controls="collapseTwo{{$produccionTransito->id}}">
                     Detalle de Compra
                   </button>
                </div>
                <div id="accordion">
                     <div id="collapseOne{{$produccionTransito->id}}" class="collapse " aria-labelledby="headingOne{{$produccionTransito->is}}" data-parent="#accordion">
                           <div class="card-body d-flex flex-wrap">
                               <h6 class="p-2 border m-1"><strong>Tarea</strong>: {{ $produccionTransito->pivotTable->tarea->nombre }}</h6>
                               <h6 class="p-2 border m-1"><strong>Proveedor</strong>: {{ $produccionTransito->pivotTable->proveedor->nombre }}</h6>
                               <h6 class="p-2 border m-1"><strong>Pais</strong> : {{$produccionTransito->pivotTable->proveedor->pais}}</h6>
                               <h6 class="p-2 border m-1"><strong>Ciudad</strong> : {{$produccionTransito->pivotTable->proveedor->ciudad}}</h6>
                               <h6 class="p-2 border m-1"><strong>Distrito</strong> : {{$produccionTransito->pivotTable->proveedor->distrito}}</h6>
                               <h6 class="p-2 border m-1"><strong>Conatacto</strong> : {{$produccionTransito->pivotTable->proveedor->contacto}}</h6>   
                               <h6 class="p-2 border m-1"><strong>Télefono</strong> : {{$produccionTransito->pivotTable->proveedor->telefono}}</h6>  
                               <h6 class="p-2 border m-1"><strong>Email</strong> : {{$produccionTransito->pivotTable->proveedor->email}}</h6>       
                           </div>
                     </div>
                     <div id="collapseTwo{{$produccionTransito->id}}" class="collapse" aria-labelledby="headingTwo{{$produccionTransito->id}}" data-parent="#accordion">
                           <div class="card-body d-flex flex-wrap">
                               @foreach( $produccionTransito->pivotTable->proveedor->compra as $compra)
                                   <h6 class="p-2 border m-1"><strong>Orden Compra</strong>: {{ $compra->orden_compra}}</h6>
                                   <h6 class="p-2 border m-1"><strong>Item</strong>: {{ $compra->item }}</h6>
                                   <h6 class="p-2 border m-1"><strong>Registro de Salud</strong>: {{ $compra->registro_salud}}</h6>
                                   <h6 class="p-2 border m-1"><strong>Cantidad PCS</strong>: {{ $compra->cantidad_pcs }}</h6>
                                   <h6 class="p-2 border m-1"><strong>Total</strong>: {{ $compra->total }}</h6>
                               @endforeach  
                           </div>
                     </div>
                </div>
        </div>
        @endif
       @endforeach 
    </div>

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

@push('scripts')
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
            let wrapperCard = document.querySelector('.wrapper-card');            
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
    
@endpush
@push('scripts')
<script type="text/javascript" src="{{asset('assets/js/jquery.filterizr.min.js')}}"></script>
<script type="text/javascript">
 $(document).ready(function() 
 {
    if($('.filtro-container').length){
    $('.filtro-container').filterizr();
  }
 })  
</script>
@endpush