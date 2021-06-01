<?php
namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Resources\Json\JsonResource;

trait ApiResponse
{
    private function successResponse($data, $code)
    {
        return response()->json($data, $code);
    }
    protected function errorResponse($message, $code)
    {
        return response()->json(['error' => $message, 'code' => $code], $code);
    }

    protected function showAll(Collection $collection, $code = 200)
    {
        return $this->successResponse(['data' => $collection], $code);
    }
    protected function showOne(Model $instace, $code = 200)
    {
        return $this->successResponse(['data' => $instace], $code);
    }
    protected function showOneResource(JsonResource $instace, $code = 200)
    {
        return $this->successResponse(['data' => $instace], $code);
    }
}