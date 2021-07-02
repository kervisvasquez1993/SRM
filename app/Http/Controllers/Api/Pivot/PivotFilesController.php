<?php

namespace App\Http\Controllers\Api\Pivot;

use App\PivotFile;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class PivotFilesController extends ApiController
{

    public function index(PivotTareaProveeder $negociacion_id)
    {
        $files = $negociacion_id->pivotFile;
        return $this->showAll($files);
    }


    public function store(Request $request)
    {
        $request->validate([
            'file' => 'max:10000',
        ]);

        $pivot_id = $request->negociacion_id;
        $name = $request->file('file')->getClientOriginalName();

        $coincidencia = PivotFile::where('pivot_tarea_proveeder_id', $pivot_id)->where('name', $name)->first();
        if ($coincidencia != null) {
            return $this->errorResponse("Ya existe un archivo con el mismo nombre",  Response::HTTP_BAD_REQUEST);
        }

        $file = new PivotFile();
        $file->pivot_tarea_proveeder_id = $pivot_id;
        $file->url = $request->file('file')->store('negociacion_archivos', 's3');
        $file->name = $request->file('file')->getClientOriginalName();
        $file->save();
        return $this->showOne($file);
    }


    public function show(PivotFile $file_id)
    {
        return $this->showOne($file_id);
    }

    public function destroy(PivotFile $file)
    {
        Storage::delete($file->url);
        $file->delete();
        return $this->showOne($file);
    }
}
