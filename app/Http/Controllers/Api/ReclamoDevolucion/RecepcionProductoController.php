<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use Error;
use App\User;
use App\RecepcionProducto;
use Illuminate\Http\Request;
use Psy\Exception\ErrorException;
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
        
        try
        {
            Excel::import(new RecepcionProductoImport($reclamos_devoluciones_id->id), $archivo);
        }
        catch(\Exception $e  )
        {
            return $this->errorResponse("Formato del Archivo no valido", 413);
        }
        





        /* notificacion */
        $login_user = auth()->user()->name;
        $comprador_asignado = User::find($reclamos_devoluciones_id->ProduccionTransito->pivotTable->tarea->user_id);
        $coordinador_asignado = User::find($reclamos_devoluciones_id->ProduccionTransito->pivotTable->tarea->sender_id);
        $nombre_empresa = $reclamos_devoluciones_id->ProduccionTransito->pivotTable->proveedor->nombre;
        $presidente = User::where('isPresidente', true)->orWhere('rol', 'almacen')->get();
        $user_all = $presidente->push($comprador_asignado, $coordinador_asignado)->unique('id');
        $body = "El usuario '$login_user' importo excel con informacion de Recepción de mercancia asociada a la empresa : '$nombre_empresa'";
        $link = "/claims/$reclamos_devoluciones_id->id/reception";
        $type = "reclamo_devolucion_carga";
        /* Notification::send($user_all, new GeneralNotification($body, $link, $tipoNotify)); */
        $title = "Importación de productos Recepción";
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
