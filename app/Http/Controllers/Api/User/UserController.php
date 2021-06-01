<?php

namespace App\Http\Controllers\Api\User;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;

class UserController extends ApiController
{
    public function index()
    {
        return $this->showAll(User::all());
    }

    public function store(Request $request)
    {

    }


    public function show(User $user)
    {
        return $this->showOne($user);
    }

    public function update(Request $request, User $user)
    {

    }


    public function destroy(User $user)
    {

    }
}
