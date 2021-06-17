<?php

namespace App\Http\Controllers\Api\Arte;

use auth;
use App\Arte;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ArteResource;
use App\Http\Controllers\ApiController;

class ArteController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $arte = Arte::all();
        $arteResource = ArteResource::collection($arte);
        return $this->showAllResources($arteResource);
    }

    public function show(Arte $arte)
    {
        return $this->showOneResource(new ArteResource($arte));
    }

    public function update(Request $request, Arte $arte)
    {
        if((auth()->user()->rol != 'coordinador') && ($request->fecha_fin))
        {
            return $this->errorResponse('No tiene Permiso para Realizar esta Operacion', 403);
        }
               
        $arte->update($request->all());
        $arte->save();
        return $this->showOneResource(new ArteResource($arte));
    }


}
