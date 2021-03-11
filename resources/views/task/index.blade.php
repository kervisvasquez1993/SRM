@extends('admin.dashboar')
@section('content')

<vuejs-datepicker></vuejs-datepicker>
    <div class="container-fluid">
            <button class="btn btn-primary btn-lg" type="button" data-toggle="modal" data-target="#abrirmodal">
                <i class="fa fa-plus fa-2x"></i>&nbsp;&nbsp;Agregar Tarea
            </button>
    </div>





    {{-- componente para listar las tareas --}}
    <div class="modal fade" id="abrirmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-primary modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Agregar Nueva Tarea</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                </div>
               
                <div class="modal-body">
                    <form action="{{route('tareas.store')}}" method="post" class="form-horizontal">
                               
                        {{csrf_field()}}
                        
                        @include('task.form')
                        
                    </form>

                  

                </div>
                
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    

   
      
     
</div> 
@stop