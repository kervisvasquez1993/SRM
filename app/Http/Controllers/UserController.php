<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class UserController extends Controller
{
    public function showCreateForm() {
        
        return view('user.create');
    }


    public function register(Request $request) {

     

        $data = $request->validate([
            'name' => 'required|min:4',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:8|confirmed',
            'rol' => ['required', /* Rule::in(['coordinador', 'comprador', 'artes']) */]
        ]);
        
        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'rol' => $data['rol']
        ]);

        Session::flash('message', 'El usuario ha sido creado satisfactoriamente');
        Session::flash('class', 'success');

        return back();
    }
}
