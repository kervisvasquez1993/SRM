<?php

namespace App\Http\Middleware;

use Closure;

class Coordinador
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
        if ($request->user()->rol == 'coordinador') {
            return $next($request);
        }

        return response()->json([
            'message' => 'Acceso restringido'
        ]);
    }
}
