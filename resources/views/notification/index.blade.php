@extends('admin.dashboar')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-6">
            <h2>No Leídas</h2>
            <ul class="list-group">
                @foreach ($unreadNotifications as $undreadNotification)
                    <li class="list-group-item"><a href="{{$undreadNotification->data['link']}}"> {{$undreadNotification->data['text']}}</a></li>
                     
                @endforeach
            </ul>
        </div>
        <div class="col-md-6">
            <h2>Leídas</h2>
            {{-- <ul class="list-group">
                @foreach ($readNotifications as $readNotification)
                    <li class="list-group-item"> {{var_dump($readNotification)}}</li>
                @endforeach
            </ul> --}}
        </div>
    </div>
</div>

@endsection