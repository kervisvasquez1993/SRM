<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use App\ImagenReclamo;
use App\ReclamoProducto;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Requests\IncidenciaValidacion;
use Symfony\Component\HttpFoundation\Response;

class ReclamoProductoController extends ApiController
{

    public function index(RecepcionReclamoDevolucion $reclamos_devoluciones_id)
    {
        $inspeccion_productos = $reclamos_devoluciones_id->ReclamoProducto;
        return $this->showAll($inspeccion_productos);
    }
    public function store(IncidenciaValidacion $request, RecepcionReclamoDevolucion $reclamos_devoluciones_id)
    {
        $request->merge(
            [
                'recepcion_reclamo_devolucion_id' =>  $reclamos_devoluciones_id->id,
                'user_login' => auth()->user()->id,
            ]
        );

        $inspeccion_producto =  ReclamoProducto::create($request->all());
        return $this->showOne($inspeccion_producto);
    }

    public function update(Request $request, ReclamoProducto $reclamo_id)
    {
        $reclamo_id->update($request->only('titulo', 'descripcion'));
        return $this->showOne($reclamo_id);
    }
    public function destroy(ReclamoProducto $reclamo_id)
    {
        $reclamo_id->delete();
        return $this->showOne($reclamo_id);
    }

    public function importarArchivo(Request $request, ReclamoProducto $reclamo_id)
    {
        $request->validate([
            'file' => 'max:10000',
        ]);

        $name = $request->file('file')->getClientOriginalName();

        $coincidencia = ImagenReclamo::where('reclamo_producto_id', $reclamo_id->id)->where('name', $name)->first();
        /* return $reclamo_id; */
        if ($coincidencia != null) {
            return $this->errorResponse("Ya existe un archivo con el mismo nombre",  Response::HTTP_BAD_REQUEST);
        }

        $file = new ImagenReclamo();

        $file->reclamo_producto_id = $reclamo_id->id;
        $file->url = $request->file('file')->store('reclamo_imagenes');
        $file->name = $request->file('file')->getClientOriginalName();
        $file->save();
        return $this->showOne($file);
    }

    public function getArchivos(ReclamoProducto $reclamo_id)
    {
        return $this->showAll($reclamo_id->imagenReclamo);
    }
}
