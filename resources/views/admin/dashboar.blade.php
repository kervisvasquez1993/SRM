<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>
  <meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />
  
  <!--     Fonts and icons     -->
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">
  <!-- CSS Files -->
  <link href="{{asset('assets/css/material-dashboard.css?v=2.1.2')}}" rel="stylesheet" />
  @yield('ccs_file')
  <!-- CSS Just for demo purpose, don't include it in your project -->
  <link href="{{asset('assets/demo/demo.css')}}" rel="stylesheet" />
  <link href="{{asset('util/css/style.css')}}" rel="stylesheet" />

  @yield('css')
  <!-- Scripts -->
  

  <!-- Styles -->
  <link href="{{ asset('css/app.css') }}" rel="stylesheet">
  @include('util.style')

</head>

<body>
<div id="app">
  <div class="wrapper">
    @include('ui.sidebar')
    @include('ui.toast')
    <div class="main-panel">
      @include('ui.nav')
      
      <div class="content" id="eventInit">
        @yield('content')
        @yield('footer') 
      </div>
    </div>
  </div>
</div>


  <!--   Core JS Files   -->
  <script src="{{asset('assets/js/core/jquery.min.js')}}"></script>
  <script src="{{asset('assets/js/core/popper.min.js')}}"></script>
  <script src="{{asset('assets/js/core/bootstrap-material-design.min.js')}}"></script>
 

  <script src="{{asset('assets/js/material-dashboard.js')}}" type="text/javascript"></script>
  <!-- Material Dashboard DEMO methods, don't include it in your project! -->
  <script>
    $(document).ready(function() {
      var abrirModal = document.querySelector('#abrirmodalEditar')
      var abrirmodalEditarProveedor = document.querySelector('#abrirmodalEditarProveedor')
      if(abrirModal)
      {

        console.log('holaaaa')
         $('#abrirmodalEditar').on('show.bs.modal', function (event) {
           var button = $(event.relatedTarget) 
           var nombre_modal_tarea = button.data('tarea')
           var nombre_modal_user_name = button.data('user_name')
           var nombre_modal_comprador = button.data('comprador')
           var nombre_modal_descripcion = button.data('descripcion')
           var nombre_modal_fecha_fin = button.data('fecha_fin')
           var id_categoria = button.data('id_tarea')
           var descripcion_modal_editar = button.data('descripcion')
           var modal = $(this)
           modal.find('.modal-body #id_tarea').val(id_categoria);
           modal.find('.modal-body #user_id').val(nombre_modal_user_name);
           modal.find('.modal-body #nombre').val(nombre_modal_tarea); 
           modal.find('.modal-body #descripcion').val(nombre_modal_descripcion);
           modal.find('.modal-body #fecha_fin').val(nombre_modal_fecha_fin);
           modal.find('.modal-body #descripcion').val(descripcion_modal_editar); 
           

           
       })
      }

      if (abrirmodalEditarProveedor)
      {
        console.log('testtttt')
         $('#abrirmodalEditarProveedor').on('show.bs.modal', function (event) {
           var button = $(event.relatedTarget) 
           var nombre_modal_tarea = button.data('tarea')
           var nombre_modal_comprador = button.data('comprador')
           var nombre_modal_descripcion = button.data('descripcion')
           var nombre_modal_fecha_fin = button.data('fecha_fin')
           var nombre_modal_user_name = button.data('user_name')
           var id_categoria = button.data('id_tarea')
           var descripcion_modal_editar = button.data('descripcion')
           var modal = $(this)
           // modal.find('.modal-title').text('New message to ' + recipient)
           modal.find('.modal-body #id_tarea').val(id_categoria);
           modal.find('.modal-body #user_id').val(nombre_modal_user_name);
           modal.find('.modal-body #nombre').val(nombre_modal_tarea);
           modal.find('.modal-body #descripcion').val(nombre_modal_descripcion);
           modal.find('.modal-body #fecha_fin').val(nombre_modal_fecha_fin);
           modal.find('.modal-body #descripcion').val(descripcion_modal_editar); 
          })
      }

      $().ready(function() {
        $sidebar = $('.sidebar');

        $sidebar_img_container = $sidebar.find('.sidebar-background');

        $full_page = $('.full-page');

        $sidebar_responsive = $('body > .navbar-collapse');

        window_width = $(window).width();

        fixed_plugin_open = $('.sidebar .sidebar-wrapper .nav li.active a p').html();

        if (window_width > 767 && fixed_plugin_open == 'Dashboard') {
          if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
            $('.fixed-plugin .dropdown').addClass('open');
          }

        }

        $('.fixed-plugin a').click(function(event) {
          // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
          if ($(this).hasClass('switch-trigger')) {
            if (event.stopPropagation) {
              event.stopPropagation();
            } else if (window.event) {
              window.event.cancelBubble = true;
            }
          }
        });

        $('.fixed-plugin .active-color span').click(function() {
          $full_page_background = $('.full-page-background');

          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          var new_color = $(this).data('color');

          if ($sidebar.length != 0) {
            $sidebar.attr('data-color', new_color);
          }

          if ($full_page.length != 0) {
            $full_page.attr('filter-color', new_color);
          }

          if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.attr('data-color', new_color);
          }
        });

        $('.fixed-plugin .background-color .badge').click(function() {
          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          var new_color = $(this).data('background-color');

          if ($sidebar.length != 0) {
            $sidebar.attr('data-background-color', new_color);
          }
        });

        $('.fixed-plugin .img-holder').click(function() {
          $full_page_background = $('.full-page-background');

          $(this).parent('li').siblings().removeClass('active');
          $(this).parent('li').addClass('active');


          var new_image = $(this).find("img").attr('src');

          if ($sidebar_img_container.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
            $sidebar_img_container.fadeOut('fast', function() {
              $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
              $sidebar_img_container.fadeIn('fast');
            });
          }

          if ($full_page_background.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
            var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

            $full_page_background.fadeOut('fast', function() {
              $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
              $full_page_background.fadeIn('fast');
            });
          }

          if ($('.switch-sidebar-image input:checked').length == 0) {
            var new_image = $('.fixed-plugin li.active .img-holder').find("img").attr('src');
            var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

            $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
            $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
          }

          if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
          }
        });

        $('.switch-sidebar-image input').change(function() {
          $full_page_background = $('.full-page-background');

          $input = $(this);

          if ($input.is(':checked')) {
            if ($sidebar_img_container.length != 0) {
              $sidebar_img_container.fadeIn('fast');
              $sidebar.attr('data-image', '#');
            }

            if ($full_page_background.length != 0) {
              $full_page_background.fadeIn('fast');
              $full_page.attr('data-image', '#');
            }

            background_image = true;
          } else {
            if ($sidebar_img_container.length != 0) {
              $sidebar.removeAttr('data-image');
              $sidebar_img_container.fadeOut('fast');
            }

            if ($full_page_background.length != 0) {
              $full_page.removeAttr('data-image', '#');
              $full_page_background.fadeOut('fast');
            }

            background_image = false;
          }
        });

        $('.switch-sidebar-mini input').change(function() {
          $body = $('body');

          $input = $(this);

          if (md.misc.sidebar_mini_active == true) {
            $('body').removeClass('sidebar-mini');
            md.misc.sidebar_mini_active = false;

            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

          } else {

            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar('destroy');

            setTimeout(function() {
              $('body').addClass('sidebar-mini');

              md.misc.sidebar_mini_active = true;
            }, 300);
          }

          // we simulate the window Resize so the charts will get updated in realtime.
          var simulateWindowResize = setInterval(function() {
            window.dispatchEvent(new Event('resize'));
          }, 180);

          // we stop the simulation of Window Resize after the animations are completed
          setTimeout(function() {
            clearInterval(simulateWindowResize);
          }, 1000);

        });
      });
    });
  </script>
  <script src="{{ asset('js/app.js') }}"></script>
  @stack('scripts')
</body>
</html>
git 