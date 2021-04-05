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
     
    /* aprobar artes  actualizar*/
    
    Route::put('/arteAprobados/{arteAprobado}', 'PivotTareaProveederController@arteAprobado')->name('arteAprobados.update');
    });



    Route::get('/usuarios', 'TareaController@usuarios');
    
    
  
    
    /* fin arte aprobado */
    
    
    Route::put('/produccionAprobados/{produccionAprobado}', 'PivotTareaProveederController@produccionAprobado')->name('produccionAprobados.update');
    Route::put('/arteProduccionAprobados/{arteProduccionAprobado}', 'PivotTareaProveederController@arteProduccionAprobado')->name('arteProduccionAprobados.update');
     // Productos
    Route::resource('productos', 'ProductoController');
 Route::get('/home', 'HomeController@index')->name('home');
});
