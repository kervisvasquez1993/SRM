@extends('admin.dashboar')
@section('content')
<div class="content">
<div class="container-fluid">
    <div class="row">
        <div class="col-md-8">
          <div class="row">
            <div class="card">
                <div class="card-header card-header-danger">
                    <h4 class="card-title">Full header coloured</h4>
                    <p class="category">Category subtitle</p>
                </div>
                <div class="card-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique id arcu quis tincidunt. Cras porta facilisis est, vel suscipit quam vehicula ac. Pellentesque sollicitudin massa in ex luctus rhoncus. Nunc sed sem diam. Aenean semper ligula vel fermentum suscipit. Vivamus ac nunc sagittis, dapibus dui quis, molestie quam. Donec condimentum consectetur dolor, et sollicitudin enim efficitur laoreet. Donec ornare gravida est quis consectetur.

                    Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed ac turpis sed nisl vehicula feugiat id placerat enim. Nam congue facilisis magna nec malesuada. Integer quis quam quis elit fringilla aliquam ac non velit. Aliquam venenatis quam nisi, vel tincidunt augue pellentesque sit amet. Pellentesque vitae augue nibh. Maecenas et augue sed tellus rutrum consectetur id in eros. In semper purus mi, quis pulvinar sem sollicitudin et. Suspendisse potenti. Quisque eleifend enim quis ante iaculis pretium. Donec consequat nibh eget egestas vestibulum. Pellentesque eget imperdiet nulla.
     
                </div>
            </div>
            
          </div>
        </div>
      <div class="col-md-4">
        <div class="card card-profile">
          <div class="card-avatar">
            <a href="javascript:;">
              <img class="img" src="../assets/img/faces/marc.jpg" />
            </a>
          </div>
          <div class="card-body">
            <h6 class="card-category text-gray">CEO / Co-Founder</h6>
            <h4 class="card-title">Alec Thompson</h4>
            <p class="card-description">
              Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
            </p>
            <a href="javascript:;" class="btn btn-primary btn-round">Follow</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  {{$perfill}}
@endsection