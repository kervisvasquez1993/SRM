<?php

namespace App\Http\Controllers\Api\Arte;

use App\Arte;
use App\User;
use Illuminate\Http\Request;
use App\ConfirmacionProveedor;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Notifications\GeneralNotification;
use App\Http\Requests\IncidenciaValidacion;
use Illuminate\Support\Facades\Notification;

class ArteConfirmacionProveedorController extends ApiController
{
    
    public function index($arte_id)
    {
        $arte = Arte::findOrFail($arte_id);
        return $this->showAll($arte->confirmacionProveedor);
    }

    public function store(IncidenciaValidacion $request, $arte_id)
    {
        $validated = $request->validated();
        $arte = Arte::findOrFail($arte_id);
        $confirmacion_proveedor = new  ConfirmacionProveedor();
        $confirmacion_proveedor->arte_id = $arte->id;
        $confirmacion_proveedor->user_id = auth()->user()->id;
        $confirmacion_proveedor->titulo = $request->titulo;
        $confirmacion_proveedor->descripcion = $request->descripcion;
        $confirmacion_proveedor->save();
        $login_user = auth()->user()->name;
        $user_all   = User::where('rol', 'artes')->orWhere('rol', 'coordinador')->get();
        $comprador_asignado = User::find($arte->pivotTable->tarea->user_id);
        $user = $user_all->push($comprador_asignado)->unique('id');
        $text    = "El usuario '$login_user' agrego una incidencia asociada a confirmacion de proveedores";
        $link    = "/arts?id=$confirmacion_proveedor->id&tab=validacion_ficha";
        $type    = "arte_ficha";
        Notification::send($user, new GeneralNotification($text, $link, $type));
        return $this->showOne($confirmacion_proveedor);
    }

    
    public function show(ConfirmacionProveedor $confirmacion_proveedor_id)
    {
        return $this->showOne($confirmacion_proveedor_id);
    }

    
    public function update(IncidenciaValidacion $request, ConfirmacionProveedor $confirmacion_proveedor_id)
    {
        $validated = $request->validated();
        $confirmacion_proveedor_id->update($request->all());
        $confirmacion_proveedor_id->save();
        return $this->showOne($confirmacion_proveedor_id);
    }

   
    public function destroy(ConfirmacionProveedor $confirmacion_proveedor_id)
    {
        $confirmacion_proveedor_id->delete();
        return $this->showOne($confirmacion_proveedor_id);
    }
}
