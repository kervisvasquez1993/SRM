<?php

use App\Http\Controllers\PerfilController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin', function () {
    return view('admin.dashboar');
});

Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');
//perfil view
Route::resource('/perfil', 'PerfilController');
//tareas 
Route::resource('/tareas', 'TareaController');
Route::put('/aprovados/{aprovado}', 'ProveedorController@aprobado')->name('aprovados.update');
Route::resource('/proveedores', 'ProveedorController');
// Bocetos
Route::resource('/bocetos', 'BocetoController');

// Validacion de Bocetos
Route::resource('/validacion-bocetos', 'ValidacionBocetoController');

// Fichas
Route::resource('/fichas', 'FichaController');

// Validacion de Fichas
Route::resource('/validacion-fichas', 'ValidacionFichaController');

// Arte
Route::get('/artes/search', 'ArteController@search')->name('artes.search');
Route::resource('/artes', 'ArteController');
Route::get('/usuarios', 'TareaController@usuarios');


/* lista de proveedor aprobado */
Route::get('/proveedor-aprobado', 'ProveedorController@listaAprobado')->name('proveedor-aprobado');  
/*  */