<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use App\Http\Controllers\ApiController;
use App\Http\Requests\IncidenciaValidacion;
use App\Http\Resources\FileResource;
use App\ImagenReclamo;
use App\RecepcionReclamoDevolucion;
use App\ReclamoProducto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
                'recepcion_reclamo_devolucion_id' => $reclamos_devoluciones_id->id,
                'user_login' => auth()->user()->id,
            ]
        );

        $inspeccion_producto = ReclamoProducto::create($request->all());
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
            'file' => 'max:500000',
        ]);

        $file = $request->file('file');
        $name = $file->getClientOriginalName();

        $coincidencia = ImagenReclamo::where('reclamo_producto_id', $reclamo_id->id)->where('name', $name)->first();

        if ($coincidencia != null) {
            return $this->errorResponse("Ya existe un archivo con el mismo nombre", Response::HTTP_BAD_REQUEST);
        }

        $pivot_file = new ImagenReclamo();
        $pivot_file->reclamo_producto_id = $reclamo_id->id;
        $pivot_file->url = Storage::disk('s3')->put("negociacion_archivos", $file, 'public');
        $pivot_file->name = $file->getClientOriginalName();
        $pivot_file->save();

        /* notifiacion */
        return $this->showOneResource(new FileResource($pivot_file));
    }

    public function getArchivos(ReclamoProducto $reclamo_id)
    {
        return $this->showAllResources(FileResource::collection($reclamo_id->imagenReclamo));
    }

    public function eliminarArchivo(ReclamoProducto $reclamo, ImagenReclamo $imagen_reclamo)
    {
        Storage::delete($imagen_reclamo->url);
        $imagen_reclamo->delete();
        return $this->showOneResource(new FileResource($imagen_reclamo));
    }
}
