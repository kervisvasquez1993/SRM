<?php

namespace App\Http\Controllers;

use App\Tarea;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TareaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    
    
     public function index(Request $request)
    {   
        $usuarios = User::where('rol', 'comprador')->get();
        $tareas = Tarea::all();
        return view('task.index', compact('tareas', 'usuarios'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function usuarios()
     {
         return User::all();
     }

    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = request()->validate([
            'nombre'      => 'required',
            'user_id'     => 'required',
            'descripcion' => 'required ',
            'fecha_fin'  =>  'required | date | after: 0 days'
        ]);
        $tarea = new Tarea();
        $tarea->nombre = $request->nombre;
        $tarea->user_id = $request->user_id;
        $tarea->descripcion = $request->descripcion;
        $tarea->fecha_fin = $request->fecha_fin;
        $tarea->save();
        return redirect()->action('TareaController@index');


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Tarea  $tarea
     * @return \Illuminate\Http\Response
     */
    public function show(Tarea $tarea)
    {
        
        
        $proveedores = $tarea->proveedor;
        $noAprovado  = $proveedores->where('aprovado', 0);
        $aprovado  = $proveedores->where('aprovado', 1);
        return view('task.show', compact('tarea', 'noAprovado', 'aprovado'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Tarea  $tarea
     * @return \Illuminate\Http\Response
     */
    public function edit(Tarea $tarea)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Tarea  $tarea
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tarea $tarea)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Tarea  $tarea
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tarea $tarea)
    {
        //
    }
}
