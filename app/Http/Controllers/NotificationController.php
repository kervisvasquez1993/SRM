<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    
    public function __contruct()
    {
        $this->middleware('auth');
    }
    public function index()
    {
        $unreadNotification = auth()->user()->unreadNotifications;
        return view('notification.index', [
            'unreadNotifications' =>  auth()->user()->unreadNotifications,

            'readNotifications' =>  auth()->user()->readNotifications,
        ]);
    }
}
 