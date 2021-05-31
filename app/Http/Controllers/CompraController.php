<?php

namespace App\Http\Controllers;

use auth;
use App\User;
use App\Compra;
use App\Proveedor;
use Illuminate\Http\Request;
use App\Notifications\purchaseDone;
use Illuminate\Support\Facades\Session;


class CompraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $id_proveedor = $request->query('id_proveedor');
        $proveedor = Proveedor::findOrFail($id_proveedor);

        return view('compras.index',compact('proveedor', 'id_proveedor'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $id_proveedor = $request->query('id_proveedor');
        $id_coordinador = $request->query('id_coordinador');
        $proveedor = Proveedor::findOrFail($id_proveedor);
        return view('compras.create',compact('proveedor', 'id_proveedor', 'id_coordinador','id_coordinador'));
    }
    public function store(Request $request)
    {
       
       
        $data = $request->validate(
            [
                'orden_compra' => 'required',
                'item' => 'required',
                'descripcion' => 'required',
                'registro_salud' => 'required', 
                'cantidad_pcs' => 'required',
                'total' => 'required',

            ]
        );

        $compra = new Compra();
        $compra->orden_compra = $data['orden_compra'];
        $compra->comprador = auth()->id();
        $compra->item = $data['item'];
        $compra->proveedor_id = $request->proveedor_id;
        $compra->descripcion = $data['descripcion'];
        $compra->registro_salud = $data['registro_salud'];
        $compra->total = $data['total'];
        $compra->cantidad_pcs = $data['cantidad_pcs'];
        $compra->save();

        $recipients = User::find($request->id_coordinador);
        $recipients->notify(new purchaseDone($compra) );
        Session::flash('message', 'Orden Añadida correctamente');
        Session::flash('class', 'success');
        return redirect()->action('ProveedorController@listaAprobado');
    }

   
    public function show(Compra $compra)
    {
        //
    }

    public function edit(Compra $compra)
    {
        return view('compras.edit', compact('compra'));
    }

   
    public function update(Request $request, Compra $compra)
    {
        $compra->orden_compra   = $request->orden_compra;
        $compra->proveedor_id   = $request->proveedor_id;
        $compra->item           = $request->item;
        $compra->descripcion    = $request->descripcion;
        $compra->registro_salud = $request->registro_salud;
        $compra->cantidad_pcs   = $request->cantidad_pcs;
        $compra->total          = $request->total;
        $compra->save();
        Session::flash('message', 'Orden Actualizada Correctamente');
        Session::flash('class', 'success');
        return redirect()->action('ProveedorController@listaAprobado');
        
    }

    public function destroy(Compra $compra)
    {
        //
    }
}
