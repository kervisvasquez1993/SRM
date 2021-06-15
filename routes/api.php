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
    Route::post('/pivot', 'Api\Pivot\PivotController@store');
    Route::get('/pivot/{pivot_id}', 'Api\Pivot\PivotController@show');
    Route::put('/pivot/{pivot_id}', 'Api\Pivot\PivotController@update');

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
   Route::get('/produccion_transito/{produccion_transito_id}', 'Api\ProduccionTransito\ProduccionTransitoController@show');
   Route::put('/produccion_transito/{produccionTransito}', 'Api\ProduccionTransito\ProduccionTransitoController@update');



    //inicio de produccion 

    Route::get('/produccion_transito/{produccion_transito_id}/inicio_produccion', 'Api\ProduccionTransito\ProduccionTransitoInicioProduccion@index');
    Route::post('/produccion_transito/{produccion_transito_id}/inicio_produccion', 'Api\ProduccionTransito\ProduccionTransitoInicioProduccion@store');
    Route::put('/inicio_produccion/{produccion_transito_id}/', 'Api\ProduccionTransito\ProduccionTransitoInicioProduccion@update');
    Route::delete('/inicio_produccion/{produccion_transito_id}', 'Api\ProduccionTransito\ProduccionTransitoInicioProduccion@destroy');



    //PAGOS
    Route::get('produccion_transito/{produccion_transito_id}/pago','Api\ProduccionTransito\ProduccionTransitoPagoController@index');
    Route::post('produccion_transito/{produccion_transito_id}/pago', 'Api\ProduccionTransito\ProduccionTransitoPagoController@store');
    Route::get('pago/{pago}', 'Api\ProduccionTransito\ProduccionTransitoPagoController@show');
    Route::put('pago/{pago}', 'Api\ProduccionTransito\ProduccionTransitoPagoController@update');
    Route::delete('pago/{pago}', 'Api\ProduccionTransito\ProduccionTransitoPagoController@destroy');


    // incidencia transitosNacionalizacion
    Route::get('produccion_transito/{produccion_transito_id}/incidencias_transito', 'Api\ProduccionTransito\ProduccionTransitoNacionalizacionController@index');
    Route::post('produccion_transito/{produccion_transito_id}/incidencias_transito', 'Api\ProduccionTransito\ProduccionTransitoNacionalizacionController@store');
    Route::get('incidencias_transito/{incidencias_transito_id}', 'Api\ProduccionTransito\ProduccionTransitoNacionalizacionController@show');
    Route::put('incidencias_transito/{incidencias_transito_id}', 'Api\ProduccionTransito\ProduccionTransitoNacionalizacionController@update');
    Route::delete('incidencias_transito/{incidencias_transito_id}', 'Api\ProduccionTransito\ProduccionTransitoNacionalizacionController@destroy');
    
    // incidencia fin de produccion 

    Route::get('produccion_transito/{produccion_transito_id}/fin_produccion', 'Api\ProduccionTransito\ProduccionTransitoFinProduccion@index');
    Route::post('produccion_transito/{produccion_transito_id}/fin_produccion', 'Api\ProduccionTransito\ProduccionTransitoFinProduccion@store');
    Route::get('fin_produccion/{fin_produccion_id}', 'Api\ProduccionTransito\ProduccionTransitoFinProduccion@show');
    Route::put('fin_produccion/{fin_produccion_id}', 'Api\ProduccionTransito\ProduccionTransitoFinProduccion@update');
    Route::delete('fin_produccion/{fin_produccion_id}', 'Api\ProduccionTransito\ProduccionTransitoFinProduccion@destroy');
   
    // fin de incidencia de fin de produccion
        
   
    //fin d earte
     //orden de compra
    Route::get('/negociacion/{negociacion_id}/compra', 'Api\Pivot\PivotCompraController@index');
    Route::post('/negociacion/{negociacion_id}/compra', 'Api\Pivot\PivotCompraController@store');
    Route::get('/compra/{compra_id}', 'Api\Pivot\PivotCompraController@show');
    Route::put('compra/{compra_id}', 'Api\Pivot\PivotCompraController@update');
    Route::delete('compra/{compra_id}', 'Api\Pivot\PivotCompraController@destroy');

    
    Route::post('createUser', 'Api\UserController@register')->name('register');


    
     //Arte Api
     Route::get('artes', 'Api\Arte\ArteController@index');
     Route::put('artes/{arte}', 'Api\Arte\ArteController@update');

     //arte fichas ', '

     Route::get('arte/{arte_id}/ficha', 'Api\Arte\ArteFichaController@index');
     Route::post('arte/{arte_id}/ficha', 'Api\Arte\ArteFichaController@store');
     Route::get('ficha/{fichaId}', 'Api\Arte\ArteFichaController@show');
     Route::put('ficha/{fichaId}', 'Api\Arte\ArteFichaController@update');
     Route::delete('ficha/{fichaId}', 'Api\Arte\ArteFichaController@destroy');
     //fin de ficha
     // arte validacion Ficha 
     Route::get('arte/{arte_id}/validacion_ficha', 'Api\Arte\ArteValidacionFichaController@index');
     Route::post('arte/{arte_id}/validacion_ficha', 'Api\Arte\ArteValidacionFichaController@store');
     Route::get('validacion_ficha/{validacion_ficha_id}', 'Api\Arte\ArteValidacionFichaController@show');
     Route::put('validacion_ficha/{validacion_ficha_id}', 'Api\Arte\ArteValidacionFichaController@update');
     Route::delete('validacion_ficha/{validacion_ficha_id}', 'Api\Arte\ArteValidacionFichaController@destroy');
     // fin arte validacion Ficha

     //boceto 
     Route::get('arte/{arte_id}/boceto', 'Api\Arte\ArteBocetoController@index');
     Route::post('arte/{arte_id}/boceto', 'Api\Arte\ArteBocetoController@store');
     Route::get('boceto/{boceto_id}', 'Api\Arte\ArteBocetoController@show');
     Route::put('boceto/{boceto_id}', 'Api\Arte\ArteBocetoController@update');
     Route::delete('boceto/{boceto_id}', 'Api\Arte\ArteBocetoController@destroy');
     //fin de boceto

     //validacion de boceto de
     Route::get('arte/{arte_id}/validacion_boceto', 'Api\Arte\ArteValidacionBocetoController@index');
     Route::post('arte/{arte_id}/validacion_boceto', 'Api\Arte\ArteValidacionBocetoController@store');
     Route::get('validacion_boceto/{validacion_boceto_id}', 'Api\Arte\ArteValidacionBocetoController@show');
     Route::put('validacion_boceto/{validacion_boceto_id}', 'Api\Arte\ArteValidacionBocetoController@update');
     Route::delete('validacion_boceto/{validacion_boceto_id}', 'Api\Arte\ArteValidacionBocetoController@destroy');
     //fin de boceto

     //confirmacion de proveedor
       Route::get('arte/{arte_id}/confirmacion_proveedor', 'Api\Arte\ArteConfirmacionProveedorController@index');
       Route::post('arte/{arte_id}/confirmacion_proveedor', 'Api\Arte\ArteConfirmacionProveedorController@store');
       Route::get('confirmacion_proveedor/{confirmacion_proveedor_id}', 'Api\Arte\ArteConfirmacionProveedorController@show');
       Route::put('confirmacion_proveedor/{confirmacion_proveedor_id}', 'Api\Arte\ArteConfirmacionProveedorController@update');
       Route::delete('confirmacion_proveedor/{confirmacion_proveedor_id}', 'Api\Arte\ArteConfirmacionProveedorController@destroy');

     //fin de produccion

});
