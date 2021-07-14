<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use App\User;
use App\RecepcionProducto;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\ApiController;
use App\Imports\RecepcionProductoImport;
use App\Notifications\GeneralNotification;

class RecepcionProductoController extends ApiController
{
  
    public function index(RecepcionReclamoDevolucion $reclamos_devoluciones_id)
    {
    
        $productos = $reclamos_devoluciones_id->recepcionProducto;
        return $this->showAll($productos);
    }

  
    public function store(Request $request)
    {
        
    }

    public function importar(Request $request, RecepcionReclamoDevolucion $reclamos_devoluciones_id)
    {
        $archivo = $request->file('import');
        $reclamos_devoluciones_id->recepcionProducto()->delete();
        Excel::import(new RecepcionProductoImport($reclamos_devoluciones_id->id), $archivo);
        /* notificacion */
        $login_user = auth()->user()->name;
        $comprador_asignado = User::find($reclamos_devoluciones_id->ProduccionTransito->pivotTable->tarea->user_id);
        $coordinador_asignado = User::find($reclamos_devoluciones_id->ProduccionTransito->pivotTable->tarea->sender_id);
        $nombre_empresa = $reclamos_devoluciones_id->ProduccionTransito->pivotTable->proveedor->nombre;
        $presidente = User::where('isPresidente', true)->get();
        $user_all = $presidente->push($comprador_asignado, $coordinador_asignado)->unique('id');
        $body = "El usuario '$login_user' importo excel con informacion de Recepción de mercancia asociada a la empresa : '$nombre_empresa'";
        $link = "";
        $type = "importacion_recepcion_mercancia";
        /* Notification::send($user_all, new GeneralNotification($body, $link, $tipoNotify)); */
        $title = "Importación de Productos en Recepción";
        $this->sendNotifications($user_all, new GeneralNotification($body, $link, $type, $title));
        
    }

    
    public function show($id)
    {
        //
    }

    
    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
