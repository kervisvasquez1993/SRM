{{-- //TODO: AGREGAR ICONO PARA CADA RUTA --}}
<div class="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
    <div class="logo"><a href="" class="simple-text logo-normal">
        SRM Dynamics
        
      </a></div>
     <div class="sidebar-wrapper">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" href="{{route('home')}}">
            <i class="material-icons">dashboard</i>
            
              <p>Inicio</p>
            
          </a>
        </li>
        @if(Auth::user()->rol == "coordinador")
        <li class="nav-item">
          <a class="nav-link" href="{{route('tareas.index')}}">
            <i class="material-icons">dashboard</i>
            
              <p>Asignacion de Tareas </p>
            
          </a>
        </li>
        @endif
        @if(Auth::user()->rol == "comprador" || Auth::user()->rol == "coordinador") 
        <li class="nav-item">
          <a class="nav-link" href="{{route('perfil.index')}}">
            <i class="material-icons">dashboard</i>
            
              <p>Tareas Asignadas</p>
            
          </a>
        </li>
               
        <li class="nav-item ">
          <a class="nav-link" href={{route('proveedor-negociacion')}}>
            <i class="material-icons">person</i>
            <p>Negociaciones</p>
          </a>
        </li>
        @endif  
        
        @if(Auth::user()->rol == "artes" || Auth::user()->rol == "coordinador" )
        <li class="nav-item ">
          <a class="nav-link" href="{{route('artes.index')}}">
            <i class="material-icons">person</i>
            <p>Artes</p>
          </a>
        </li>
        @endif
      </ul>
    </div> 
  </div>