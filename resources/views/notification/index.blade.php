@extends('admin.dashboar')

@section('content')
<div class="container">
    <div class="row">
        <div></div>
        <div class="col-md-12">
            <h2>Notificaciones</h2>
            <ul class="list-group">
                @foreach ($unreadNotifications as $undreadNotification)
                    @if($undreadNotification->type == "App\Notifications\TareaSent")
                    <li class="list-group-item">
                        <a href="{{$undreadNotification->data['link']}}"> {{$undreadNotification->data['text']}}</a>
                        <form action="{{route('notification.read', $undreadNotification->id)}}" method="post" class="pull-right">
                            {{method_field('PATCH')}}
                            {{csrf_field()}}
                            <button class="btn btn-danger btn-xs">X</button>
                        </form>
                    </li>

                    @endif
                     
                @endforeach
            </ul>
        </div>
       
    </div>
</div>

@endsection