<?php

namespace App\Http\Controllers\Api\Pivot;

use App\PivotFile;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Storage;

class PivotFilesController extends ApiController
{

    public function index(PivotTareaProveeder $negociacion_id)
    {
        $files = $negociacion_id->pivotFile;
        return $this->showAll($files);
    }


    public function store(Request $request)
    {
        $file = new PivotFile();
        $file->pivot_tarea_proveeder_id = $request->negociacion_id;
        $file->url = $request->file('file')->store('negociacion_archivos');
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
