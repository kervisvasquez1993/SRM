<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProveedorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'pais' => $this->pais,
            'ciudad' => $this->ciudad,
            'distrito' => $this->distrito,
            'descripcion' => $this->descripcion,
            'archivos_src' => $this->archivos_src,
            'address' => $this->address,
            'contacto' => $this->contacto,
            'telefono' => $this->telefono,
            'email' => $this->email,
            'pivot' => $this->when($request->tarea || $request->tarea_id, function () use ($request) {
                if ($request->tarea_id) {
                    return $this->pivotTareaProveedor()->where('tarea_id', $request->tarea_id)->first();
                }
                return $this->pivotTareaProveedor()->where('tarea_id', $request->tarea->id)->first();
            })
        ];
    }
}
