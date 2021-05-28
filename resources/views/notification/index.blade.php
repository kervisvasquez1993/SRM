@extends('admin.dashboar')

@section('content')
<div class="container">
    <div class="row">
        <div></div>
        <div class="col-md-6">
            <h2>No Leídas</h2>
            <ul class="list-group">
                @foreach ($unreadNotifications as $undreadNotification)
                    <li class="list-group-item">
                        <a href="{{$undreadNotification->data['link']}}"> {{$undreadNotification->data['text']}}</a>
                        <form action="{{route('notification.read', $undreadNotification->id)}}" method="post" class="pull-right">
                            {{method_field('PATCH')}}
                            {{csrf_field()}}
                            <button class="btn btn-danger btn-xs">X</button>
                        </form>
                    </li>
                     
                @endforeach
            </ul>
        </div>
        <div class="col-md-6">
            <h2>Leídas</h2>
             <ul class="list-group">
                @foreach ($readNotifications as $readNotification)
                    <li class="my-2 list-group-item"> {{$readNotification->data['text']}}</li>
                @endforeach
            </ul> 
        </div>
    </div>
</div>

@endsection