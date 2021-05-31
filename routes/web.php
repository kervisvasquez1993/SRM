<?php

use App\Http\Livewire\ShowPosts;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PerfilController;


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

/* Route::get('/', 'InicioController@index'); */


Route::get('/', 'Auth\LoginController@showLoginForm')->name('login');/* cambiamos el login */
Route::post('/', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

Route::group(['middleware' => 'auth'], function () {

    Route::view('/{path?}', 'dashboard')
     ->where('path', '.*')
     ->name('react');

    /* Rutas asociadas a compradores */


    /* Zona de Middleware para compradores y coordinador */
    Route::resource('/perfil', 'PerfilController')->middleware('comprador');
    //tareas 
    Route::resource('/tareas', 'TareaController')->middleware('comprador', ['only' => ['index', 'show']]);

    Route::get('/proveedor-negociacion', 'ProveedorController@listaAprobado')->name('proveedor-negociacion');
    //perfil view
    Route::put('/negociaciones/{negociar}', 'ProveedorController@Negociar')->name('negociaciones.update');
    Route::resource('/proveedores', 'ProveedorController');


    /* middleware para los usuarios de Artes */
    Route::group(['middleware' => 'Artes'], function () {
        // Bocetos
        Route::resource('/bocetos', 'BocetoController');

        // Validacion de Bocetos
        Route::resource('/validacion-bocetos', 'ValidacionBocetoController');

        // Fichas
        Route::resource('/fichas', 'FichaController');

        // Validacion de Fichas
        Route::resource('/validacion-fichas', 'ValidacionFichaController');

        // Confirmacion Proveedor
        Route::resource('/confirmacion-proveedor', 'ConfirmacionProveedorController');

        // Arte
        Route::get('/artes/search', 'ArteController@search')->name('artes.search');
        Route::resource('/artes', 'ArteController');
        /* lista de proveedor aprobado */
        // Route::get('pago-anticipado/{id_pago}/delete', 'PagoAnticipadoController@destroy')->name('PagoAnticipado.destroy');

    });

    /* fin de Middleware de Artes */


    /* aprobar artes  actualizar*/

    // Produccion Transito
    Route::resource('/produccion-transito', 'ProduccionTransitoController');
    Route::put('/salida-puerto-origen/{id}', 'ProduccionTransitoController@salidaPuerto')->name('salida-puerto-origen.update');
    Route::put('/produccion-transito/inciar-produccion/{id}', 'ProduccionTransitoController@iniciarProduccion')->name('ProduccionTransito.iniciarProd');


    // Pago Anticipado
    Route::resource('/pago-anticipado', 'PagoAnticipadoController');

    // Pago Balance
    Route::resource('/pago-balance', 'PagoBalanceController');

    // Transito Nacionalizacion
    Route::resource('/transito-nacionalizacion', 'TransitoNacionalizacionController');

    // Fin Produccion
    Route::resource('/fin-produccion', 'FinProduccionController');
    // usuarios
    Route::get('/usuarios', 'TareaController@usuarios');

    // Reclamos y devoluciones
    Route::resource('/reclamos-devoluciones', 'RecepcionReclamoDevolucionController');

    // Recepcion mercancia
    Route::resource('/recepcion-mercancias', 'RecepcionMercanciaController');

    // Inspeccion carga
    Route::resource('/inspeccion-cargas', 'InspeccionCargaController');

    // Reclamo Devolucion
    Route::resource('/reclamo-devoluciones', 'ReclamosDevolucioneController');


    /* fin arte aprobado */

    Route::put('/arteAprobados/{arteAprobado}/{proveedor}', 'PivotTareaProveederController@arteAprobado')->name('arteAprobados.update');
    Route::put('/produccionAprobados/{produccionAprobado}/{proveedor}', 'PivotTareaProveederController@produccionAprobado')->name('produccionAprobados.update');
    Route::put('/arteProduccionAprobados/{arteProduccionAprobado}/{proveedor}', 'PivotTareaProveederController@arteProduccionAprobado')->name('arteProduccionAprobados.update');
    // Productos
    Route::resource('productos', 'ProductoController');
    Route::resource('compras', 'CompraController');
    Route::post('/importProduct/{id}', 'ProductoController@import')->name('importProduct');
    Route::get('showImport/{proveedor_id}', 'ProductoController@showImport')->name('producto.showImport');
    Route::get('/home', 'HomeController@index')->name('home');
    // Pago anticipado
    Route::resource('/pago-anticipado', 'PagoAnticipadoController');
    // Route::get('pago-anticipado/{id_pago}/delete', 'PagoAnticipadoController@destroy')->name('PagoAnticipado.destroy');
    // Inicio Produccion
    Route::resource('/inicio-produccion', 'InicioProduccionController');

    // Create user routes
    Route::get('createUser', 'UserController@showCreateForm')->name('showRegister');
    Route::post('createUser', 'UserController@register')->name('register');
});
