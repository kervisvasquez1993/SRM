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
    
    Route::apiResource('user', 'Api\User\UserController')->except([
        'store', 'update', 'destroy'
    ]);
    Route::post('/tarea/{tarea_id}/proveedor', 'Api\Proveedor\ProveedorController@store');

    Route::apiResource('proveedor', 'Api\Proveedor\ProveedorController')->except('destroy', 'store');
    Route::put('/tarea/{tarea_id}/proveedor/{proveedor_id}', 'Api\Proveedor\ProveedorController@updateFromTask');
    Route::get('/tarea/{tarea_id}/proveedor', 'Api\Proveedor\ProveedorController@indexTareaProveedor');
    Route::post('/tarea/{tarea_id}/proveedor', 'Api\Proveedor\ProveedorController@store');
    Route::post('/tarea/{tarea_id}/proveedor/{proveedor_id}/negociar', 'Api\Proveedor\ProveedorController@iniciarNegociacion');

    //Pivot 

    Route::get('/pivot', 'Api\Pivot\PivotController@index');
    Route::get('/pivot/{pivot_id}', 'Api\Pivot\PivotController@show');

    //INICIA ARTE y negociacion 

    Route::put('/negociacion/{pivotTareaProveederId}/iniciar-arte', 'Api\Pivot\PivotController@startArte');
    Route::put('/negociacion/{pivotTareaProveederId}/iniciar-produccion', 'Api\Pivot\PivotController@startProduccion');
    



    //productos 

    Route::get('/negociacion/{pivot_tarea_proveedor}/productos', 'Api\Producto\ProductoController@index');
    Route::post('/negociacion/{pivot_tarea_proveedor}/productos', 'Api\Producto\ProductoController@store');
    Route::put('/productos/{producto}', 'Api\Producto\ProductoController@update');
    Route::delete('/productos/{producto}', 'Api\Producto\ProductoController@delete');
        //fin de productos

     //orden de compra 
    Route::post('/negociaciones/{negociacion_id}/compras', 'Api\Pivot\PivotCompraController@store'); 
    Route::get('/negociaciones/{negociacione_id}/compras/', 'Api\Pivot\PivotCompraController@show'); 
    Route::put('/negociaciones/{negociacione_id}/compras/{compra}', 'Api\Pivot\PivotCompraController@update'); 
    
     //orden de compra
     Route::post('/negociacion/{negociacion_id}/compra', 'Api\Pivot\PivotCompraController@store'); 
     Route::get('/negociacion/{negociacion_id}/compra', 'Api\Pivot\PivotCompraController@show');
     Route::put('compra/{compra_id}', 'Api\Pivot\PivotCompraController@update');
     Route::delete('compra/{compra_id}', 'Api\Pivot\PivotCompraController@destroy');

     //fin de orden de compra

    //produccion y transito 

   Route::get('/produccion_transito', 'Api\ProduccionTransito\ProduccionTransitoController@index');

    //pago anticipado
    Route::get('produccion_transito/{produccion_transito_id}/pago_anticipado', 'Api\ProduccionTransito\ProduccionTransitoPagoAnticipadoController@index');
    Route::post('produccion_transito/{produccion_transito_id}/pago_anticipado', 'Api\ProduccionTransito\ProduccionTransitoPagoAnticipadoController@store');
    Route::put('/pago_anticipado/{pago_anticipado_id}', 'Api\ProduccionTransito\ProduccionTransitoPagoAnticipadoController@update');
    Route::delete('/pago_anticipado/{pago_anticipado_id}', 'Api\ProduccionTransito\ProduccionTransitoPagoAnticipadoController@destroy');
    //fin de pago de anticipado 

    //inicio de produccion 
    Route::get('/negociacion/{negociacion_id}/inicioProduccion', 'Api\ProduccionTransito\ProduccionTransitoInicioProduccion@index');
    Route::post('/negociacion/{negociacion_id}/inicioProduccion', 'Api\ProduccionTransito\ProduccionTransitoInicioProduccion@store');
    Route::put('/inicioProduccion/{inicioProduccion_id}', 'Api\ProduccionTransito\ProduccionTransitoInicioProduccion@update');
    Route::delete('/inicioProduccion/{inicioProduccion_id}', 'Api\ProduccionTransito\ProduccionTransitoInicioProduccion@destroy');


    Route::get('/pagoAnticipado/{pago_anticipado_id}/pagoBalance', 'Api\ProduccionTransito\ProduccionTransitoPagoBalanceController@index');


});
