<?php

namespace App\Http\Controllers;

use App\Arte;
use App\Estatus;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;

class ArteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    
    
     public function index(Request $request)
    {
        
        // $artes = Arte::all();

        $estatus = Estatus::all();
        
       // Request data
        $creacion_ficha_id = $request->get('campo_filtro') === 'creacion_fichas' ? $request->get('estatus_id'): null;
        $validacion_ficha_id = $request->get('campo_filtro') === 'validacion_fichas' ? $request->get('estatus_id'): null;
        $creacion_boceto_id = $request->get('campo_filtro') === 'creacion_boceto' ? $request->get('estatus_id'): null; 
        $validacion_boceto_id = $request->get('campo_filtro') === 'validacion_boceto' ? $request->get('estatus_id'): null;
        $confirmacion_proveedor_id = $request->get('campo_filtro') === 'confirmacion_proveedor' ? $request->get('estatus_id'): null;
        
        $artes = Arte::creacionFicha( $creacion_ficha_id )
            ->validacionFicha( $validacion_ficha_id)
            ->creacionBoceto( $creacion_boceto_id )
            ->validacionBoceto( $validacion_boceto_id )
            ->confirmacionProveedor( $confirmacion_proveedor_id )->get(); 

       

        return view('arte.index', compact('artes', 'estatus'));
    }


 
 
    public function update(Request $request, Arte $arte)
    {
        $data = $request->all()['params'];
        $arte->creacion_fichas = $data['creacion_ficha'];
        $arte->validacion_fichas = $data['validacion_ficha'];
        $arte->creacion_boceto = $data['creacion_boceto'];
        $arte->validacion_boceto = $data['validacion_boceto'];
        $arte->confirmacion_proveedor = $data['confirmacion_proveedor'];
        $arte->save();

        return Arte::where('id', $arte->id)->first();  

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Arte  $arte
     * @return \Illuminate\Http\Response
     */
    public function destroy(Arte $arte)
    {
        //
    }
}
