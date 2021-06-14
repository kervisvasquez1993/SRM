<?php

namespace App\Http\Controllers\Api\Arte;

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

    public function update(Request $request, Arte $arte)
    {
        $arte->update($request->all());
        $arte->save();
        return $this->showOne($arte);
    }


}
