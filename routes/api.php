<?php

use App\Http\Controllers\Api\WebNotificationController;
use App\User;
use Illuminate\Http\Request;
use App\Http\Livewire\ShowPosts;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Route;
use App\Notifications\GeneralNotification;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;
use Kreait\Firebase\Messaging\WebPushConfig;


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

Route::get('/proveedor', 'Api\ProveedorController@index');
Route::get('/filter', 'Api\FilterProduccionTransitoController@index');

Route::post('login', 'Api\AuthController@login');


Route::middleware('auth:api')->group(function () {


    Route::get('me', 'Api\AuthController@me');
    Route::post('logout', 'Api\AuthController@logout');
    //tareas
    Route::apiResource('tarea', 'Api\Tarea\TareaController');
    //fin de tarea

    Route::apiResource('draggable_task', 'Api\DraggableTaskController')->except(['destroy', 'show', 'store']);

    Route::get('me/tareas', 'Api\Tarea\TareaController@tareasUsuario');

    Route::apiResource('user', 'Api\User\UserController')->except(['destroy']);

    /* insertar nuevo proveedor con notificacion */
    Route::post('/tarea/{tarea_id}/proveedor', 'Api\Proveedor\ProveedorController@store');


    Route::apiResource('proveedor', 'Api\Proveedor\ProveedorController')->except('destroy', 'store');

    //proveedores
    Route::put('/tarea/{tarea_id}/proveedor/{proveedor_id}', 'Api\Proveedor\ProveedorController@updateFromTask');
    Route::get('/tarea/{tarea_id}/proveedor', 'Api\Proveedor\ProveedorController@indexTareaProveedor');
    Route::post('/tarea/{tarea_id}/proveedor', 'Api\Proveedor\ProveedorController@store');
    Route::post('/tarea/{tarea_id}/proveedor/{proveedor_id}/negociar', 'Api\Proveedor\ProveedorController@iniciarNegociacion');
    // fin de proveedores
    //Pivot 
    Route::get('/pivot', 'Api\Pivot\PivotController@index');
    Route::post('/pivot', 'Api\Pivot\PivotController@store');
    Route::get('/pivot/{pivot_id}', 'Api\Pivot\PivotController@show');
    Route::put('/pivot/{pivot_id}', 'Api\Pivot\PivotController@update');

    //INICIA ARTE y negociacion 

    Route::put('/negociacion/{pivotTareaProveederId}/iniciar-arte', 'Api\Pivot\PivotController@startArte');
    Route::put('/negociacion/{pivotTareaProveederId}/iniciar-produccion', 'Api\Pivot\PivotController@startProduccion');
    /* Route::post('/testProduccion/{id}', 'Api\Pivot\PivotController@artesCreate'); */



    //productos
    Route::get('/negociacion/{pivot_tarea_proveedor}/productos', 'Api\Producto\ProductoController@index');
    /* ruta para importar productos */
    Route::post('/negociacion/{pivot_tarea_proveeder_id}/importar-producto', 'Api\Producto\ProductoController@importProduct');
    /* fin importan producto */
    Route::post('/negociacion/{pivot_tarea_proveedor}/productos', 'Api\Producto\ProductoController@store');
    Route::put('/productos/{producto}', 'Api\Producto\ProductoController@update');
    Route::delete('/productos/{producto}', 'Api\Producto\ProductoController@delete');
    //fin de productos

    //orden de compra 
    Route::post('/negociaciones/{negociacion_id}/compras', 'Api\Pivot\PivotCompraController@store');
    Route::post('/negociaciones/{negociacion}/importCompra', 'Api\Pivot\PivotCompraController@importCompra');
    Route::get('/negociaciones/{negociacion}/importCompra', 'Api\Pivot\PivotCompraController@exportCompra');
    Route::get('/negociaciones/{negociacione_id}/compras', 'Api\Pivot\PivotCompraController@show');
    Route::put('/negociaciones/{negociacione_id}/compras/{compra}', 'Api\Pivot\PivotCompraController@update');

    //orden de compra

    Route::post('/negociacion/{negociacion_id}/compra', 'Api\Pivot\PivotCompraController@store');
    Route::get('/negociacion/{negociacion_id}/compra', 'Api\Pivot\PivotCompraController@show');
    Route::put('compra/{compra_id}', 'Api\Pivot\PivotCompraController@update');
    Route::delete('compra/{compra_id}', 'Api\Pivot\PivotCompraController@destroy');
    //fin de orden de compraº

    /* imagenes de proveedores */
    Route::get('/negociacion/{negociacion_id}/file', 'Api\Pivot\PivotFilesController@index');
    Route::post('/negociacion/{negociacion_id}/file', 'Api\Pivot\PivotFilesController@store');
    Route::get('/file/{file_id}', 'Api\Pivot\PivotFilesController@show');
    Route::delete('/file/{file}', 'Api\Pivot\PivotFilesController@destroy');
    //produccion y transito 

    Route::get('/produccion_transito', 'Api\ProduccionTransito\ProduccionTransitoController@index');
    Route::get('/produccion_transito/{produccionTransito}', 'Api\ProduccionTransito\ProduccionTransitoController@show');
    Route::put('/produccion_transito/{produccionTransito}', 'Api\ProduccionTransito\ProduccionTransitoController@update');
    /* Route::post('/reclamos/{id}', 'Api\ProduccionTransito\ProduccionTransitoController@reclamosDevolucion'); */

    //inicio de produccion 

    Route::get('/produccion_transito/{produccion_transito}/inicio_produccion', 'Api\ProduccionTransito\ProduccionTransitoInicioProduccion@index');
    Route::post('/produccion_transito/{produccion_transito}/inicio_produccion', 'Api\ProduccionTransito\ProduccionTransitoInicioProduccion@store');
    Route::put('/inicio_produccion/{inicio_produccion}', 'Api\ProduccionTransito\ProduccionTransitoInicioProduccion@update');
    Route::delete('/inicio_produccion/{inicio_produccion}', 'Api\ProduccionTransito\ProduccionTransitoInicioProduccion@destroy');



    //PAGOS
    Route::get('produccion_transito/{produccion_transito_id}/pago', 'Api\ProduccionTransito\ProduccionTransitoPagoController@index');
    Route::post('produccion_transito/{produccion_transito_id}/pago', 'Api\ProduccionTransito\ProduccionTransitoPagoController@store');
    Route::get('pago/{pago}', 'Api\ProduccionTransito\ProduccionTransitoPagoController@show');
    Route::post('pago/{pago}', 'Api\ProduccionTransito\ProduccionTransitoPagoController@update');
    // Route::post('pago/{pago}/archivo', 'Api\ProduccionTransito\ProduccionTransitoPagoController@actualizarArchivo');
    Route::delete('pago/{pago}', 'Api\ProduccionTransito\ProduccionTransitoPagoController@destroy');


    // incidencia transitosNacionalizacion
    Route::get('produccion_transito/{produccion_transito}/incidencias_transito', 'Api\ProduccionTransito\ProduccionTransitoNacionalizacionController@index');
    Route::post('produccion_transito/{produccion_transito}/incidencias_transito', 'Api\ProduccionTransito\ProduccionTransitoNacionalizacionController@store');
    Route::get('incidencias_transito/{incidencia_transito}', 'Api\ProduccionTransito\ProduccionTransitoNacionalizacionController@show');
    Route::put('incidencias_transito/{incidencia_transito}', 'Api\ProduccionTransito\ProduccionTransitoNacionalizacionController@update');
    Route::delete('incidencias_transito/{incidencia_transito}', 'Api\ProduccionTransito\ProduccionTransitoNacionalizacionController@destroy');

    // incidencia fin de produccion 

    Route::get('produccion_transito/{produccion_transito}/fin_produccion', 'Api\ProduccionTransito\ProduccionTransitoFinProduccion@index');
    Route::post('produccion_transito/{produccion_transito}/fin_produccion', 'Api\ProduccionTransito\ProduccionTransitoFinProduccion@store');
    Route::get('fin_produccion/{fin_produccion}', 'Api\ProduccionTransito\ProduccionTransitoFinProduccion@show');
    Route::put('fin_produccion/{fin_produccion}', 'Api\ProduccionTransito\ProduccionTransitoFinProduccion@update');
    Route::delete('fin_produccion/{fin_produccion}', 'Api\ProduccionTransito\ProduccionTransitoFinProduccion@destroy');

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
    Route::get('artes/{arte}', 'Api\Arte\ArteController@show');
    Route::put('artes/{arte}', 'Api\Arte\ArteController@update');

    //arte fichas ', '

    Route::get('arte/{arte}/ficha', 'Api\Arte\ArteFichaController@index');
    Route::post('arte/{arte}/ficha', 'Api\Arte\ArteFichaController@store');
    Route::get('ficha/{ficha}', 'Api\Arte\ArteFichaController@show');
    Route::put('ficha/{ficha}', 'Api\Arte\ArteFichaController@update');
    Route::delete('ficha/{ficha}', 'Api\Arte\ArteFichaController@destroy');
    //fin de ficha
    // arte validacion Ficha 
    Route::get('arte/{arte}/validacion_ficha', 'Api\Arte\ArteValidacionFichaController@index');
    Route::post('arte/{arte}/validacion_ficha', 'Api\Arte\ArteValidacionFichaController@store');
    Route::get('validacion_ficha/{validacion_ficha}', 'Api\Arte\ArteValidacionFichaController@show');
    Route::put('validacion_ficha/{validacion_ficha}', 'Api\Arte\ArteValidacionFichaController@update');
    Route::delete('validacion_ficha/{validacion_ficha}', 'Api\Arte\ArteValidacionFichaController@destroy');
    // fin arte validacion Ficha

    //boceto 
    Route::get('arte/{arte}/boceto', 'Api\Arte\ArteBocetoController@index');
    Route::post('arte/{arte}/boceto', 'Api\Arte\ArteBocetoController@store');
    Route::get('boceto/{boceto}', 'Api\Arte\ArteBocetoController@show');
    Route::put('boceto/{boceto}', 'Api\Arte\ArteBocetoController@update');
    Route::delete('boceto/{boceto}', 'Api\Arte\ArteBocetoController@destroy');
    //fin de boceto

    //validacion de boceto de
    Route::get('arte/{arte}/validacion_boceto', 'Api\Arte\ArteValidacionBocetoController@index');
    Route::post('arte/{arte}/validacion_boceto', 'Api\Arte\ArteValidacionBocetoController@store');
    Route::get('validacion_boceto/{validacion_boceto}', 'Api\Arte\ArteValidacionBocetoController@show');
    Route::put('validacion_boceto/{validacion_boceto}', 'Api\Arte\ArteValidacionBocetoController@update');
    Route::delete('validacion_boceto/{validacion_boceto}', 'Api\Arte\ArteValidacionBocetoController@destroy');
    //fin de boceto

    //confirmacion de proveedor
    Route::get('arte/{arte}/confirmacion_proveedor', 'Api\Arte\ArteConfirmacionProveedorController@index');
    Route::post('arte/{arte}/confirmacion_proveedor', 'Api\Arte\ArteConfirmacionProveedorController@store');
    Route::get('confirmacion_proveedor/{confirmacion_proveedor}', 'Api\Arte\ArteConfirmacionProveedorController@show');
    Route::put('confirmacion_proveedor/{confirmacion_proveedor}', 'Api\Arte\ArteConfirmacionProveedorController@update');
    Route::delete('confirmacion_proveedor/{confirmacion_proveedor}', 'Api\Arte\ArteConfirmacionProveedorController@destroy');
    //fin de produccion
    //notificacion
    Route::get('notificacion', 'Api\Notification\NotificationController@index');
    Route::get('notificacion/count', 'Api\Notification\NotificationController@count');
    Route::patch('/notificacion/{id}', 'Api\Notification\NotificationController@read');


    /* Recepcion reclamos y devoluciones */
    Route::get('/reclamos_devoluciones', 'Api\ReclamoDevolucion\ReclamoDevolucionController@index');
    Route::get('/reclamos_devoluciones/{reclamos_devolucion}', 'Api\ReclamoDevolucion\ReclamoDevolucionController@show');
    Route::get('/reclamos_devoluciones/{reclamos_devolucione}', 'Api\ReclamoDevolucion\ReclamoDevolucionController@show');
    Route::put('/reclamos_devoluciones/{reclamos_devolucione}', 'Api\ReclamoDevolucion\ReclamoDevolucionController@update');
    /* fin de reclamos y devoluciones */


    /* show de productos de recepcion reclamo devoucion */
    /* productos en recepcion */
    Route::get('/reclamos_devoluciones/{reclamos_devoluciones_id}/recepcion', 'Api\ReclamoDevolucion\RecepcionProductoController@index');
    Route::post('/reclamos_devoluciones/{reclamos_devoluciones_id}/importar', 'Api\ReclamoDevolucion\RecepcionProductoController@importar');
    /* fin del producto */

    /* show para inspeccion de mercancia */
    Route::get('/reclamos_devoluciones/{reclamos_devoluciones_id}/reclamo', 'Api\ReclamoDevolucion\ReclamoProductoController@index');
    Route::post('/reclamos_devoluciones/{reclamos_devoluciones_id}/reclamo', 'Api\ReclamoDevolucion\ReclamoProductoController@store');
    Route::put('/reclamo/{reclamo_id}', 'Api\ReclamoDevolucion\ReclamoProductoController@update');
    Route::delete('/reclamo/{reclamo_id}', 'Api\ReclamoDevolucion\ReclamoProductoController@destroy');
    /* imagenes para reclamos */
    Route::get('/reclamo/{reclamo_id}/archivo', 'Api\ReclamoDevolucion\ReclamoProductoController@getArchivos');
    Route::post('/reclamo/{reclamo_id}/archivo', 'Api\ReclamoDevolucion\ReclamoProductoController@importarArchivo');
    Route::delete('/reclamo/{reclamo}/archivo/{imagen_reclamo}', 'Api\ReclamoDevolucion\ReclamoProductoController@eliminarArchivo');
    /* imagenesde inspeccion */
    Route::get('/reclamos_devoluciones/{reclamos_devoluciones_id}/imagen_inspeccion', 'Api\ReclamoDevolucion\ImagenInspeccionController@index');
    Route::post('/reclamos_devoluciones/{reclamos_devoluciones_id}/imagen_inspeccion', 'Api\ReclamoDevolucion\ImagenInspeccionController@store');
    Route::get('/imagen_inspeccion/{imagen_inspeccion_id}', 'Api\ReclamoDevolucion\ImagenInspeccionController@show');
    Route::delete('/imagen_inspeccion/{imagen_inspeccion_id}', 'Api\ReclamoDevolucion\ImagenInspeccionController@destroy');
    /* fin de inspeccion */
    /* fin show para inspeccion de mercancia */
    /*  fin show de productos de recepcion reclamo devoucion  */
    /* incidencias de Recepción */
    Route::get('/reclamos_devoluciones/{reclamos_devolucione}/incidencia_recepcion', 'Api\ReclamoDevolucion\IncidenciaRecepcion@index');
    Route::post('/reclamos_devoluciones/{reclamos_devolucione}/incidencia_recepcion', 'Api\ReclamoDevolucion\IncidenciaRecepcion@store');
    Route::get('/incidencia_recepcion/{incidencia_recepcion_id}', 'Api\ReclamoDevolucion\IncidenciaRecepcion@show');
    Route::put('/incidencia_recepcion/{incidencia_recepcion_id}', 'Api\ReclamoDevolucion\IncidenciaRecepcion@update');
    Route::delete('/incidencia_recepcion/{incidencia_recepcion_id}', 'Api\ReclamoDevolucion\IncidenciaRecepcion@destroy');
    /* FIN incidencias de Recepción  */


    /* incidencias de inspeccion */
    Route::get('/reclamos_devoluciones/{reclamos_devolucione}/inspeccion_carga', 'Api\ReclamoDevolucion\IncidenciaInspeccionController@index');
    Route::post('/reclamos_devoluciones/{reclamos_devolucione}/inspeccion_carga', 'Api\ReclamoDevolucion\IncidenciaInspeccionController@store');
    Route::get('/inspeccion_carga/{inspeccion_carga_id}', 'Api\ReclamoDevolucion\IncidenciaInspeccionController@show');
    Route::put('/inspeccion_carga/{inspeccion_carga_id}', 'Api\ReclamoDevolucion\IncidenciaInspeccionController@update');
    Route::delete('/inspeccion_carga/{inspeccion_carga_id}', 'Api\ReclamoDevolucion\IncidenciaInspeccionController@destroy');
    /* FIN incidencias de Inspeccion  */

    /* incidencias de  */
    Route::get('/reclamos_devoluciones/{reclamos_devolucione}/reclamos_devolucion', 'Api\ReclamoDevolucion\IncidenciaReclamoController@index');
    Route::post('/reclamos_devoluciones/{reclamos_devolucione}/reclamos_devolucion', 'Api\ReclamoDevolucion\IncidenciaReclamoController@store');
    Route::get('/reclamos_devolucion/{reclamos_devolucion_id}', 'Api\ReclamoDevolucion\IncidenciaReclamoController@show');
    Route::put('/reclamos_devolucion/{reclamos_devolucion_id}', 'Api\ReclamoDevolucion\IncidenciaReclamoController@update');
    Route::delete('/reclamos_devolucion/{reclamos_devolucion_id}', 'Api\ReclamoDevolucion\IncidenciaReclamoController@destroy');
    /* FIN incidencias de Inspeccion  */

    /* Archivados */
    Route::get('/archivado', 'Api\Archivado\ArchivadoController@index');
    Route::get('/archivado/{/archivado_id}', 'Api\Archivado\ArchivadoController@show');
    Route::put('/archivado/{/archivado_id}', 'Api\Archivado\ArchivadoController@update');

    /* fin de archivado */

    // Notificaciones
    Route::post('/push-notification', 'Api\WebNotificationController@storeToken');
    Route::delete('/push-notification/{fcmToken}', 'Api\WebNotificationController@deleteToken');

   
});
