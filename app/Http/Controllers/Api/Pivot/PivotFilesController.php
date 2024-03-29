<?php

namespace App\Http\Controllers\Api\Pivot;

use App\Http\Controllers\ApiController;
use App\Http\Resources\FileResource;
use App\PivotFile;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class PivotFilesController extends ApiController
{

    public function index(PivotTareaProveeder $negociacion_id)
    {
        $files = $negociacion_id->pivotFile;
        return $this->showAllResources(FileResource::collection($files));
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'max:500000',
        ]);

        $file = $request->file('file');

        $pivot_id = $request->negociacion_id;
        $name = $file->getClientOriginalName();

        $coincidencia = PivotFile::where('pivot_tarea_proveeder_id', $pivot_id)->where('name', $name)->first();
        if ($coincidencia != null) {
            return $this->errorResponse("Ya existe un archivo con el mismo nombre", Response::HTTP_BAD_REQUEST);
        }

        $pivot_file = new PivotFile();
        $pivot_file->pivot_tarea_proveeder_id = $pivot_id;
        $pivot_file->url = Storage::disk('s3')->put("negociacion_archivos", $file, 'public');
        $pivot_file->name = $file->getClientOriginalName();
        $pivot_file->save();
        return $this->showOneResource(new FileResource($pivot_file));
    }

    public function show(PivotFile $file_id)
    {
        return $this->showOneResource(new FileResource($file_id));
    }

    public function destroy(PivotFile $file)
    {
        Storage::delete($file->url);
        $file->delete();
        return $this->showOneResource(new FileResource($file));
    }
}
