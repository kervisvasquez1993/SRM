<nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <a class="navbar-brand" href="javascript:;">Dashboard</a>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
        <span class="sr-only">Toggle navigation</span>
        <span class="navbar-toggler-icon icon-bar"></span>
        <span class="navbar-toggler-icon icon-bar"></span>
        <span class="navbar-toggler-icon icon-bar"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
      
        <ul class="navbar-nav">
         
          <li class="nav-item">
            <a class="nav-link" href="{{route('notifications.index')}}"  >
              <i class="material-icons">notifications</i>
               @if($count = Auth::user()->notifications->count())
                   <span class="notification">{{$count}}</span>
               @endif
              <p class="d-lg-none d-md-block">
                Some Actions
              </p>
            </a>
          </li>
          <li class="nav-item ">
           
              <p class="d-lg-none d-md-block">
                Account
              </p>
              {{Auth::user()->name}}
          </li>
          <li class="nav-item mx-2 p-2">
            <a class="" href="{{ route('logout') }}"
              onclick="event.preventDefault();
                            document.getElementById('logout-form').submit();">
               {{ __('Logout') }}
            </a>
            <form id="logout-form" action="{{ route('logout') }}" method="POST" >
              @csrf
            </form>
          </li>

        </ul>
      </div>
    </div>
  </nav>