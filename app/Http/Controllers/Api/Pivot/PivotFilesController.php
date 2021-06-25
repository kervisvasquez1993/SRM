<?php

namespace App\Http\Controllers\Api\Pivot;

use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\PivotFile;

class PivotFilesController extends ApiController
{
    
    public function index(PivotTareaProveeder $negociacion_id)
    {
        $files = $negociacion_id->pivotFile;
        return $this->showAll($files);
    }

    
    public function store(Request $request)
    {
        $request->merge(['pivot_tarea_proveeder_id' => $request->negociacion_id]);
        $filePivo = PivotFile::create($request->all());
        return $this->showOne($filePivo);
        
        
    }

 
    public function show(PivotFile $file_id)
    {
       
        return $this->showOne($file_id);
    }

    
    public function update(Request $request, PivotFile $file_id)
    {
        $file_id->update($request->all());
        return $this->showOne($file_id); 
    }

   
    public function destroy(PivotFile $file_id)
    {
        $file_id->delete();
        return $this->showOne($file_id);
    }
}
