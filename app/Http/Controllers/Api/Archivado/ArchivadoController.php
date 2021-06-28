<?php

namespace App\Http\Controllers\Api\Archivado;

use App\Archivado;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Resources\ArchivadoResource;

class ArchivadoController extends ApiController
{
    
    public function index()
    {
        
        $resource = ArchivadoResource::collection(Archivado::all());
        return $resource;
        
    }

    
    public function store(Request $request)
    {
        //
    }

    
    public function show($id)
    {
        //
    }

    
    public function update(Request $request, $id)
    {
        //
    }

   
    public function destroy($id)
    {
        //
    }
}
