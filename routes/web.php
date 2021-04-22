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
   Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
   Route::post('login', 'Auth\LoginController@login');
   Route::post('logout', 'Auth\LoginController@logout')->name('logout');
   Route::group(['middleware' => 'auth'], function () {
    /* Rutas asociadas a compradores */
 


    /* Zona de Middleware para compradores y coordinador */
    Route::resource('/perfil', 'PerfilController')->middleware('comprador');
    //tareas 
    Route::resource('/tareas', 'TareaController')->middleware(  'comprador', ['only' => ['index', 'show']]  );

    Route::get('/proveedor-negociacion', 'ProveedorController@listaAprobado')->name('proveedor-negociacion'); 
    //perfil view
    Route::put('/negociaciones/{negociar}', 'ProveedorController@Negociar')->name('negociaciones.update');
    Route::resource('/proveedores', 'ProveedorController');
  

    /* middleware para los usuarios de Artes */
    Route::group(['middleware' => 'Artes'], function () 
    {
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
         Route::put('/arteAprobados/{arteAprobado}', 'PivotTareaProveederController@arteAprobado')->name('arteAprobados.update');
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
  
    
    /* fin arte aprobado */
    
    
    Route::put('/produccionAprobados/{produccionAprobado}', 'PivotTareaProveederController@produccionAprobado')->name('produccionAprobados.update');
    Route::put('/arteProduccionAprobados/{arteProduccionAprobado}', 'PivotTareaProveederController@arteProduccionAprobado')->name('arteProduccionAprobados.update');
     // Productos
    Route::resource('productos', 'ProductoController');
    Route::post('/importProduct', 'ProductoController@import')->name('importProduct');
    Route::get('showImport/{producto}', 'ProductoController@showImport')->name('producto.showImport');
    Route::get('/home', 'HomeController@index')->name('home');
    // Pago anticipado
    Route::resource('/pago-anticipado', 'PagoAnticipadoController');
    // Route::get('pago-anticipado/{id_pago}/delete', 'PagoAnticipadoController@destroy')->name('PagoAnticipado.destroy');
    // Inicio Produccion
    Route::resource('/inicio-produccion', 'InicioProduccionController');
});
