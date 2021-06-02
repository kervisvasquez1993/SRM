<?php


use Illuminate\Http\Request;
use App\Http\Livewire\ShowPosts;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/proveedor', 'Api\ProveedorController@index');
Route::get('/users', 'Api\UserController@index');
Route::get('/filter', 'Api\FilterProduccionTransitoController@index');

Route::post('login', 'Api\AuthController@login');

Route::middleware('auth.jwt')->group(function () {
    Route::get('me', 'Api\AuthController@me');
    Route::post('logout', 'Api\AuthController@logout');
    Route::post('refresh', 'Api\AuthController@refresh');
    Route::apiResource('tarea', 'Api\Tarea\TareaController');
    Route::get('me/tareas', 'Api\Tarea\TareaController@tareasUsuario');

    Route::apiResource('proveedor', 'Api\Proveedor\ProveedorController')->except('destroy', 'store');
    Route::get('/tarea/{tarea_id}/proveedor', 'Api\Proveedor\ProveedorController@indexTareaProveedor');
    Route::post('/tarea/{tarea_id}/proveedor', 'Api\Proveedor\ProveedorController@store');
    Route::post('/tarea/{tarea_id}/proveedor/{proveedor_id}/negociar', 'Api\Proveedor\ProveedorController@iniciarNegociacion');
});
