<?php

namespace App\Http\Controllers\Api\Arte;

use App\Arte;
use App\User;
use Illuminate\Http\Request;
use App\ConfirmacionProveedor;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Resources\IncidenciaResource;
use App\Notifications\GeneralNotification;
use App\Http\Requests\IncidenciaValidacion;
use Illuminate\Support\Facades\Notification;

class ArteConfirmacionProveedorController extends ApiController
{
    
    public function index(Arte $arte)
    {
        return $this->showAllResources(IncidenciaResource::collection($arte->confirmacionProveedor));
    }

    public function store(IncidenciaValidacion $request, Arte $arte)
    {
        $request->validated();

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
        $link    = "/arts?id=$arte->id&tab=confirmacion_proveedor";
        $type    = "confirmacion_proveedor";
        Notification::send($user, new GeneralNotification($text, $link, $type));
        return $this->showOneResource(new IncidenciaResource($confirmacion_proveedor));
    }

    
    public function show(ConfirmacionProveedor $confirmacion_proveedor)
    {
        return $this->showOneResource(new IncidenciaResource($confirmacion_proveedor));
    }

    
    public function update(IncidenciaValidacion $request, ConfirmacionProveedor $confirmacion_proveedor)
    {
        $request->validated();
        $confirmacion_proveedor->update($request->all());
        $confirmacion_proveedor->save();
        return $this->showOneResource(new IncidenciaResource($confirmacion_proveedor));
    }

   
    public function destroy(ConfirmacionProveedor $confirmacion_proveedor)
    {
        $confirmacion_proveedor->delete();
        return $this->showOneResource(new IncidenciaResource($confirmacion_proveedor));
    }
}
