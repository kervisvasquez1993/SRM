<nav class="navbar-dashboard">
    <div class="navbar-inicio">
        <button id="botonSidebar">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
        </button>
    </div>
    
    <a class="campana" href="{{route('notifications.index')}}">
        <i class="material-icons">
            notifications
        </i>        @if($count = Auth::user()->unreadNotifications->count())
        <span class="campana-numero">
  
             <span class="notification">{{$count}}</span>
          
    </span>
    @endif
    </a>

    <span class="usuario-nombre">
        {{ Auth::user()->name }}
    </span>

    <a class="cerrar-sesion-dashboard btn btn-primary" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
        {{ __('Logout') }}
        
    </a>
</nav>

