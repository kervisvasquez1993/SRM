<?php

namespace App\Http\Controllers\Api\Proveedor;

use App\User;
use App\Tarea;
use App\Proveedor;
use App\PivotTareaProveeder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\TareaProveedor;
use App\Http\Controllers\ApiController;
use App\Http\Resources\ProveedorResource;
use App\Notifications\NegociacionEmpresa;
use Illuminate\Support\Facades\Validator;
use App\Notifications\GeneralNotification;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpFoundation\Response;


class ProveedorController extends ApiController
{
    public function index(Request $request)
    {
        $resources = ProveedorResource::collection(Proveedor::all());
        return $this->showAllResources($resources);
    }

    public function show(Proveedor $proveedor)
    {
        return $this->showOneResource(new ProveedorResource($proveedor));
    }

    public function indexTareaProveedor($tarea_id)
    {
        $tarea = Tarea::findOrFail($tarea_id);

        // obtener todos los pivot_tarea_proveeders que tengan esta tarea
        $pivotes = PivotTareaProveeder::where('tarea_id', $tarea_id)->get();

        // Crear un eloquent collection con los proveedores a partir de los pivotes
        $proveedores = $pivotes->map(function ($elemento) {
            return $elemento->proveedor;
        });

        $resources = ProveedorResource::collection($proveedores);
        return $this->showAllResources($resources);
    }

    public function __construct()
    {
        $this->middleware('comprador');
    }

    public function store(Request $request, $tarea_id)
    {
        // Obtener la tarea
        $tarea = Tarea::findOrFail($tarea_id);

        // Crear el validador
        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
            'pais'   => 'required',
            'ciudad' =>  'required',
            'distrito' =>  'required',
        ]);

        // Comprobar la validacion
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $paisMayusculas = strtoupper($request->pais);

        // Comprobar si el proveedor ya existe
        $proveedor = Proveedor::where('nombre', $request->nombre)->where('pais', $paisMayusculas)->first();

        if ($proveedor) {
            // Comprobar si la tarea ya tiene agregada el proveedor existente
            if ($tarea->proveedores->where('nombre', $request->nombre)->where('pais', $paisMayusculas)->count() === 0) {
                // Si ya existe una empresa con el mismo nombre y pais, entonces se hara el pivote entre dicha empresa y la tarea
                // y de este modo no crear una empresa nueva
                $this->crearPivotConTarea($tarea_id, $proveedor->id);

                return $this->showOneResource(new ProveedorResource($proveedor), Response::HTTP_ACCEPTED);
            } else {
                return $this->errorResponse("Esta tarea ya tiene un proveedor con el mismo nombre y país", Response::HTTP_BAD_REQUEST);
            }
        } else {
            // Crear una empresa nueva
            $proveedor = new Proveedor();
            $proveedor->nombre = $request['nombre'];
            $proveedor->pais   = $paisMayusculas;
            $proveedor->ciudad = $request['ciudad'];
            $proveedor->distrito = $request['distrito'];
            $proveedor->descripcion = $request['descripcion'];
            $proveedor->address = $request['address'];
            $proveedor->contacto = $request['contacto'];
            $proveedor->telefono = $request['telefono'];
            $proveedor->email = $request['email'];
            $proveedor->save();
            $login_user = auth()->user()->name;
            $coordinador = User::find($tarea->sender_id);
            $presidentes = User::where('isPresidente', true)->get();
            $userAll = $presidentes->push($coordinador)->unique('id'); 
            
            $empresa_agregada = $proveedor->nombre;
            $text = "El usuario '$login_user' añadió la empresa '$empresa_agregada' a la tarea '$tarea->nombre'";
            $link = "/tasks/$tarea->id?providerId=$proveedor->id";
            $type = "empresa_agregada";
            $title = "Empresa Agregada";

            $this->sendNotifications($userAll, new GeneralNotification($text, $link, $type, $title));

            // informacion asociada a la tabla pivot
            $this->crearPivotConTarea($tarea_id, $proveedor->id);

            return $this->showOneResource(new ProveedorResource($proveedor), Response::HTTP_ACCEPTED);
        }
    }


    public function crearPivotConTarea($tarea_id, $proveedor_id)
    {
        $pivotTareaProveedor = new PivotTareaProveeder();
        $pivotTareaProveedor->tarea_id = $tarea_id;
        $pivotTareaProveedor->proveedor_id = $proveedor_id;
        $pivotTareaProveedor->iniciar_negociacion = false;
        $pivotTareaProveedor->iniciar_arte = false;
        $pivotTareaProveedor->iniciar_produccion = false;
        $pivotTareaProveedor->save();
        return $this->successMensaje("Nueva pivot", Response::HTTP_ACCEPTED);
    }

    public function update(Request $request, Proveedor $proveedor)
    {
        // Crear el validador
        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
            'pais'   => 'required',
            'ciudad' =>  'required',
            'distrito' =>  'required',
        ]);

        // Comprobar la validacion
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $paisMayusculas = strtoupper($request->pais);

        // Comprobar si ya existe un proveedor con el mismo nombre y pais
        $proveedorExistente = Proveedor::where('nombre', $request->nombre)->where('pais', $paisMayusculas)->first();

        if ($proveedorExistente && $proveedorExistente != $proveedor) {
            return $this->errorResponse("Ya existe una empresa con este nombre y pais", Response::HTTP_BAD_REQUEST);
        }
        // Actualizar los campos del proveedor
        $proveedor->nombre = $request['nombre'];
        $proveedor->pais   = $paisMayusculas;
        $proveedor->ciudad = $request['ciudad'];
        $proveedor->distrito = $request['distrito'];
        $proveedor->descripcion = $request['descripcion'];
        $proveedor->address = $request['address'];
        $proveedor->contacto = $request['contacto'];
        $proveedor->telefono = $request['telefono'];
        $proveedor->email = $request['email'];
        $proveedor->save();
        return $this->showOneResource(new ProveedorResource($proveedor), Response::HTTP_ACCEPTED);
    }

    public function updateFromTask(Request $request, $tarea_id, $proveedor_id)
    {
        $proveedor = Proveedor::findOrFail($proveedor_id);

        return $this->update($request, $proveedor);
    }

    public function iniciarNegociacion(Request $request, Tarea $tarea_id, Proveedor $proveedor_id)
    {
        // Obtener la tarea
        
        $pivote = PivotTareaProveeder::where('tarea_id', $tarea_id->id)->where('proveedor_id', $proveedor_id->id)->first();
        // Iniciar negociacion
        $pivote->iniciar_negociacion = 1;
        $pivote->save();
        $link = "/negotiations?id=$pivote->id";
        /* $recipient =  User::find($tarea->sender_id); */
        $coordinador = User::find($pivote->tarea->sender_id);
        $presidentes = User::where('rol', 'presidente')->get();
        $userAll = $presidentes->push($coordinador)->unique('id'); 
        $user_login = auth()->user()->name; 
        $text = "El usuario '$user_login' inicio un proceso de negociación con la empresa: '$proveedor_id->nombre' asociada a la tarea: '$tarea_id->nombre'";
        $type = "iniciar_negociacion";
        Notification::send($userAll, new GeneralNotification($text, $link, $type));
        return $this->successMensaje("La negociacion se inicio exitosamente", Response::HTTP_ACCEPTED);
    }
}
