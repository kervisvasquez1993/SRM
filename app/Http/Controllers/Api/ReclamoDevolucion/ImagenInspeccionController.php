<?php

namespace App\Http\Controllers\Api\ReclamoDevolucion;

use App\ImagenInspeccion;
use Illuminate\Http\Request;
use App\RecepcionReclamoDevolucion;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class ImagenInspeccionController extends ApiController
{
    
    public function index(RecepcionReclamoDevolucion $reclamos_devoluciones_id)
    {
        $imagenes = $reclamos_devoluciones_id->ImagenInspeccion;
        return $this->showAll($imagenes);
    }


    public function store(Request $request, RecepcionReclamoDevolucion $reclamos_devoluciones_id)
    {
        $request->validate([
            'file' => 'max:10000',
        ]);
        $name = $request->file('file')->getClientOriginalName();

        $coincidencia = ImagenInspeccion::where('recepcion_reclamo_devolucion_id', $reclamos_devoluciones_id->id)->where('name', $name)->first();
        if ($coincidencia != null) {
            return $this->errorResponse("Ya existe un archivo con el mismo nombre",  Response::HTTP_BAD_REQUEST);
        }

        $file = new ImagenInspeccion();
        $file->recepcion_reclamo_devolucion_id = $reclamos_devoluciones_id->id;
        $file->url = $request->file('file')->store('inspeccion_imagenes');
        $file->name = $request->file('file')->getClientOriginalName();
        $file->save();
        return $this->showOne($file);
    }

    public function show(ImagenInspeccion $imagen_inspeccion_id)
    {
        return $this->showOne($imagen_inspeccion_id);
    }

    

    public function destroy(ImagenInspeccion $imagen_inspeccion_id)
    {
        Storage::delete($imagen_inspeccion_id->url);
        $imagen_inspeccion_id->delete();
        return $this->showOne($imagen_inspeccion_id);
    }
}
