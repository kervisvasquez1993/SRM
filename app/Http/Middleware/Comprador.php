<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;

class Comprador
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        if ($request->user()->rol == 'comprador' || $request->user()->rol == 'coordinador' || $request->user()->rol == 'observador') {
            return $next($request);
        }

        return response()->json([
            'message' => 'Acceso restringido solo a Compradores y Coordinadores'
        ], Response::HTTP_FORBIDDEN);
    }
}
