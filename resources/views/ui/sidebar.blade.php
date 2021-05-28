{{-- //TODO: AGREGAR ICONO PARA CADA RUTA --}}
<div class="menu">
    <div class="logo">
        <a href="" class="simple-text logo-normal">SRM Dynamics</a>
    </div>
    
    <nav class="">
        <a class="menu-link" href="{{ route('home') }}">
            <i class="material-icons">dashboard</i>
            <span>Inicio</span>
        </a>

        @if (Auth::user()->rol == 'coordinador')
            <a class="menu-link" href="{{ route('showRegister') }}">
                <i class="material-icons">person</i>
                <span>Crear Usuario</span>
            </a>
        @endif
        @if (Auth::user()->rol == 'coordinador')
            <a class="menu-link" href="{{ route('tareas.index') }}">
                <i class="material-icons">task_alt</i>

                <span>Asignacion de Tareas </span>

            </a>
        @endif
        @if (Auth::user()->rol == 'comprador' || Auth::user()->rol == 'coordinador')

            <a class="menu-link" href="{{ route('perfil.index') }}">
                <i class="material-icons">task</i>
                <span>Tareas Asignadas</span>
            </a>

            <a class="menu-link" href={{ route('proveedor-negociacion') }}>
                <i class="material-icons">business</i>
                <span>Negociaciones</span>
            </a>
        @endif

        @if (Auth::user()->rol == 'artes' || Auth::user()->rol == 'coordinador')

            <a class="menu-link" href="{{ route('artes.index') }}">
                <i class="material-icons">brush</i>
                <span>Artes</span>
            </a>

        @endif

        @if (Auth::user()->rol == 'comprador' || Auth::user()->rol == 'coordinador')

            <a class="menu-link" href="{{ route('produccion-transito.index') }}">
                <i class="material-icons">precision_manufacturing</i>
                <span>Produccion y Transito</span>
            </a>
        @endif

        @if (Auth::user()->rol == 'comprador' || Auth::user()->rol == 'coordinador')
            <a class="menu-link" href="{{ route('reclamos-devoluciones.index') }}">
                <i class="material-icons">production_quantity_limits
                </i>
                <span>Reclamos y Devoluciones</span>
            </a>
        @endif

        <a class="menu-link cerrar-sesion" href="javascript:;" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
            <i class="material-icons">logout</i>
            <span>{{ __('Logout') }}</span>
        </a>
    </nav>
</div>

<form id="logout-form" action="{{ route('logout') }}" method="POST">
    @csrf
</form>


{{-- <div class="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
  <div class="logo"><a href="" class="simple-text logo-normal">
          SRM Dynamics</a>
  </div>
  <div class="sidebar-wrapper">
      <ul class="nav">
          <li class="nav-item">
              <a class="nav-link" href="{{ route('home') }}">
                  <i class="material-icons">dashboard</i>

                  <p>Inicio</p>

              </a>
          </li>

          @if (Auth::user()->rol == 'coordinador')
              <li class="nav-item">
                  <a class="nav-link" href="{{ route('showRegister') }}">
                      <i class="material-icons">person</i>

                      <p>Crear Usuario</p>

                  </a>
              </li>
          @endif
          @if (Auth::user()->rol == 'coordinador')
              <li class="nav-item">
                  <a class="nav-link" href="{{ route('tareas.index') }}">
                      <i class="material-icons">task_alt</i>

                      <p>Asignacion de Tareas </p>

                  </a>
              </li>
          @endif
          @if (Auth::user()->rol == 'comprador' || Auth::user()->rol == 'coordinador')
              <li class="nav-item">
                  <a class="nav-link" href="{{ route('perfil.index') }}">
                      <i class="material-icons">task</i>

                      <p>Tareas Asignadas</p>


                  </a>
              </li>

              <li class="nav-item ">
                  <a class="nav-link" href={{ route('proveedor-negociacion') }}>
                      <i class="material-icons">business</i>
                      <p>Negociaciones</p>
                  </a>
              </li>
          @endif

          @if (Auth::user()->rol == 'artes' || Auth::user()->rol == 'coordinador')
              <li class="nav-item ">
                  <a class="nav-link" href="{{ route('artes.index') }}">
                      <i class="material-icons">brush</i>
                      <p>Artes</p>
                  </a>
              </li>
          @endif

          @if (Auth::user()->rol == 'comprador' || Auth::user()->rol == 'coordinador')
              <li class="nav-item ">
                  <a class="nav-link" href="{{ route('produccion-transito.index') }}">
                      <i class="material-icons">precision_manufacturing
                      </i>
                      <p>Produccion y Transito</p>
                  </a>
              </li>
          @endif

          @if (Auth::user()->rol == 'comprador' || Auth::user()->rol == 'coordinador')
              <li class="nav-item ">
                  <a class="nav-link" href="{{ route('reclamos-devoluciones.index') }}">
                      <i class="material-icons">production_quantity_limits
                      </i>
                      <p>Reclamos y Devoluciones</p>
                  </a>
              </li>
          @endif
      </ul>
  </div>
</div> --}}
