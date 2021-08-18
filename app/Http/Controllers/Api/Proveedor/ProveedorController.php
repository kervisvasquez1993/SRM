<?php

namespace App\Http\Controllers\Api\Proveedor;

use App\Http\Controllers\ApiController;
use App\Http\Resources\ProveedorResource;
use App\Notifications\GeneralNotification;
use App\PivotTareaProveeder;
use App\Proveedor;
use App\Tarea;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ProveedorController extends ApiController
{
    public $validacion = [
        'nombre' => 'required',
        'pais' => 'required',
        'ciudad' => 'required',
        'distrito' => 'required',
    ];

    public $errorProveedorRepetido = "Un proveedor con el mismo nombre y país ha sido creado anteriormente";

    public function index(Request $request)
    {
        $resources = ProveedorResource::collection(Proveedor::all());
        return $this->showAllResources($resources);
    }

    public function show(Proveedor $proveedor)
    {
        return $this->showOneResource(new ProveedorResource($proveedor));
    }

    public function indexTareaProveedor(Tarea $tarea)
    {
        // obtener todos los pivot_tarea_proveeders que tengan esta tarea
        $pivotes = PivotTareaProveeder::where('tarea_id', $tarea->id)->get();

        // Crear un eloquent collection con los proveedores a partir de los pivotes
        $proveedores = $pivotes->map(function ($elemento) {
            return $elemento->proveedor;
        });

        $resources = ProveedorResource::collection($proveedores);
        return $this->showAllResources($resources);
    }

    public function store(Request $request)
    {
        error_log("store");
        // Crear el validador
        $validator = Validator::make($request->all(), $this->validacion);

        // Comprobar la validacion
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $paisMayusculas = strtoupper($request->pais);

        if ($this->existeProveedor($request->nombre, $paisMayusculas)) {
            return $this->errorResponse($this->errorProveedorRepetido, Response::HTTP_BAD_REQUEST);
        } else {
            // Crear una empresa nueva
            $proveedor = new Proveedor();
            $proveedor->nombre = $request['nombre'];
            $proveedor->pais = $paisMayusculas;
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
    }

    public function existeProveedor($nombre, $pais)
    {
        return Proveedor::where('nombre', $nombre)->where('pais', $pais)->first();
    }

    public function crearParaTarea(Request $request, Tarea $tarea)
    {
        // Crear el validador
        $validator = Validator::make($request->all(), $this->validacion);

        // Comprobar la validacion
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $paisMayusculas = strtoupper($request->pais);

        if ($this->existeProveedor($request->nombre, $paisMayusculas)) {
            return $this->errorResponse($this->errorProveedorRepetido, Response::HTTP_BAD_REQUEST);
        } else {
            // Crear una empresa nueva
            $proveedor = new Proveedor();
            $proveedor->nombre = $request['nombre'];
            $proveedor->pais = $paisMayusculas;
            $proveedor->ciudad = $request['ciudad'];
            $proveedor->distrito = $request['distrito'];
            $proveedor->descripcion = $request['descripcion'];
            $proveedor->address = $request['address'];
            $proveedor->contacto = $request['contacto'];
            $proveedor->telefono = $request['telefono'];
            $proveedor->email = $request['email'];
            $proveedor->save();

            // Notificación
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

            // Crear negociacion entre la tarea y el proveedor
            $this->crearPivotConTarea($tarea, $proveedor);

            return $this->showOneResource(new ProveedorResource($proveedor), Response::HTTP_ACCEPTED);
        }
    }

    public function crearPivotConTarea(Tarea $tarea, Proveedor $proveedor)
    {
        $pivotTareaProveedor = new PivotTareaProveeder();
        $pivotTareaProveedor->tarea_id = $tarea->id;
        $pivotTareaProveedor->proveedor_id = $proveedor->id;
        $pivotTareaProveedor->productos_cargados = false;
        $pivotTareaProveedor->iniciar_arte = false;
        $pivotTareaProveedor->iniciar_produccion = false;
        $pivotTareaProveedor->save();
        return $this->successMensaje("Nueva pivot", Response::HTTP_ACCEPTED);
    }

    public function update(Request $request, Proveedor $proveedor)
    {
        // Crear el validador
        $validator = Validator::make($request->all(), $this->validacion);

        // Comprobar la validacion
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $paisMayusculas = strtoupper($request->pais);

        // Comprobar si ya existe un proveedor con el mismo nombre y pais
        $proveedorExistente = $this->existeProveedor($request->nombre, $paisMayusculas);
        if ($proveedorExistente && $proveedorExistente->id != $proveedor->id) {
            return $this->errorResponse("Ya existe una empresa con este nombre y pais", Response::HTTP_BAD_REQUEST);
        }

        // Actualizar los campos del proveedor
        $proveedor->nombre = $request['nombre'];
        $proveedor->pais = $paisMayusculas;
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

    public function updateFromTask(Request $request, Tarea $tarea, Proveedor $proveedor)
    {
        return $this->update($request, $proveedor);
    }

    public function iniciarNegociacion(Request $request, Tarea $tarea, Proveedor $proveedor_id)
    {
        // Obtener la tarea
        $pivote = PivotTareaProveeder::where('tarea_id', $tarea->id)->where('proveedor_id', $proveedor_id->id)->first();
        // Iniciar negociacion
        $pivote->productos_cargados = 1;
        $pivote->save();
        $link = "/negotiations?id=$pivote->id";
        /* $recipient =  User::find($tarea->sender_id); */
        $coordinador = User::find($pivote->tarea->sender_id);
        $presidentes = User::where('rol', 'presidente')->get();
        $userAll = $presidentes->push($coordinador)->unique('id');
        $user_login = auth()->user()->name;
        $text = "El usuario '$user_login' inicio un proceso de negociación con la empresa: '$proveedor_id->nombre' asociada a la tarea: '$tarea->nombre'";
        $type = "productos_cargados";
        Notification::send($userAll, new GeneralNotification($text, $link, $type));
        return $this->successMensaje("La negociacion se inicio exitosamente", Response::HTTP_ACCEPTED);
    }
}
