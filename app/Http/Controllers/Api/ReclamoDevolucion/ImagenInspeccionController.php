<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use App\ImagenInspeccion;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use App\Http\Resources\FileResource;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class ImagenInspeccionController extends ApiController
{

    public function index(RecepcionReclamoDevolucion $reclamos_devoluciones_id)
    {
        return $this->showAllResources(FileResource::collection($reclamos_devoluciones_id->ImagenInspeccion));
    }


    public function store(Request $request, RecepcionReclamoDevolucion $reclamos_devoluciones_id)
    {

        $request->validate([
            'file' => 'max:10000',
        ]);

        $file = $request->file('file');
        $name = $file->getClientOriginalName();

        $coincidencia = ImagenInspeccion::where('recepcion_reclamo_devolucion_id', $reclamos_devoluciones_id->id)->where('name', $name)->first();
        if ($coincidencia != null) {
            return $this->errorResponse("Ya existe un archivo con el mismo nombre",  Response::HTTP_BAD_REQUEST);
        }

        $pivot_file = new ImagenInspeccion();
        $pivot_file->recepcion_reclamo_devolucion_id = $reclamos_devoluciones_id->id;
        $pivot_file->url = Storage::disk('s3')->put("negociacion_archivos",  $file, 'public');
        $pivot_file->name = $file->getClientOriginalName();
        $pivot_file->save();
        return $this->showOneResource(new FileResource($pivot_file));
    }

    public function show(ImagenInspeccion $imagen_inspeccion_id)
    {
        return $this->showOneResource(new FileResource($imagen_inspeccion_id));
    }

    public function destroy(ImagenInspeccion $imagen_inspeccion_id)
    {
        Storage::delete($imagen_inspeccion_id->url);
        $imagen_inspeccion_id->delete();
        return $this->showOneResource(new FileResource($imagen_inspeccion_id));
    }
}
