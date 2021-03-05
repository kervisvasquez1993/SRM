@extends('admin.dashboar')
@section('css_file')
<link href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.37/css/bootstrap-datetimepicker.css" rel="stylesheet"/>

@endsection
@section('content')
<div class="card">
    <div class="card-header card-header-primary">
      <h4 class="card-title">Asignacion de Tarea</h4>
      <p class="card-category"></p>
    </div>
    <div class="card-body">
      <form>
        <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label class="bmd-label-floating">Nombre de la Tarea</label>
              <input type="text" class="form-control">
            </div>
          </div>
          <div class="col-md-3">
                <div class="form-group ">
                    <label for="exampleFormControlSelect1">Example select</label>
                    <select class="form-control selectpicker" data-style="btn btn-link" id="exampleFormControlSelect1">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                </div>
          </div>
          <div class='col-sm-3'>
            <div class="form-group">
                <div class='input-group date' id='datetimepicker1'>
                    <label class="bmd-label-floating">Fecha de Finalizacion</label>
                    <input type="email" class="form-control">
                </div>
            </div>
        </div>
        </div>
    
        
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Descripcion</label>
              <div class="form-group">
                <label class="bmd-label-floating">Descripcion de la Tarea</label>
                <textarea class="form-control" rows="5"></textarea>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary pull-right">Agregar Tarea</button>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
 
  <div class="form-group">
    <label for="exampleFormControlSelect1">Example select</label>
    <select class="form-control selectpicker" data-style="btn btn-link" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
@stop

@section('scripts')
  <script>
      
  </script>
@stop