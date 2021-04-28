@extends('admin.dashboar')

@section('content')
    <div class="main-register">
        <div class="main-form">

            <h3 class="form-title">Crea un nuevo usuario</h3>

            <form action="{{ route('register') }}" method="POST" novalidate>
                @csrf
                <div class="form-group @error('name') has-danger @enderror">
                    <label class="bmd-label-floating">Nombre</label>
                    <input value="{{ old('name') }}" autocomplete="off" name="name" type="text" class="form-control">
                    @error('name')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>

                <div class="form-group @error('name') has-danger @enderror">
                    <label class="bmd-label-floating">Email</label>
                    <input value="{{ old('email') }}" autocomplete="off" name="email" type="email" class="form-control">
                    @error('email')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>


                <div class="form-group @error('name') has-danger @enderror">
                    <label class="bmd-label-floating">Contraseña</label>
                    <input value="{{ old('password') }}" autocomplete="off" name="password" type="password" class="form-control">
                    @error('password')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>

                <div class="form-group @error('name') has-danger @enderror">
                    <label class="bmd-label-floating">Confirmar Contraseña</label>
                    <input value="{{ old('confirm-password') }}" autocomplete="off" name="password_confirmation" type="password" class="form-control">
                    @error('confirm-password')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>

                <div class="form-group @error('rol') has-danger @enderror">
                    <label for="exampleFormControlSelect1" class="bmd-label-floating">Rol</label>
                    {{-- <input value="{{ old('rol') }}" autocomplete="off" name="rol" type="text" class="form-control"> --}}
                    <select class="form-control selectpicker" name="rol" data-style="btn btn-link" id="exampleFormControlSelect1">
                        <option value="coordinador">Coordinador</option>
                        <option value="artes">Artes</option>
                        <option value="comprador">Comprador</option>
                      </select>
                    @error('rol')
                        <span class="invalid-feedback d-block" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>


                <div class="d-flex justify-content-center mt-3">
                    <button class="btn btn-outline-primary btn-round">
                        Crear
                    </button>
                </div>
            </form>
        </div>
    </div>

    @if(Session::has('message'))
        <div id="toast" class="toast alert alert-{{ Session::get('class') }} alert-dismissible fade show" role="alert">
            {{ Session::get('message') }}

            <span class="material-icons ml-2">
                done_all
            </span>

            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
    @endif
@endsection

@section('css')
    <style>
        .main-register {
            /* height: 100%;      */
            display: flex;
            justify-content: center;
            align-items: center;       
        }

        .form-title {
            margin-bottom: 1.2em;
        }

        .main-form {
            max-width: 40em;
        }

        .toast {
            display: flex;
            justify-content: center;
            position: fixed;
            top: 50%;
            left: 10px;
            right: 10px;
            align-items: center;
        }
    </style>
@endsection