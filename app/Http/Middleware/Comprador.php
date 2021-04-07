<?php

namespace App\Http\Middleware;

use Closure;


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
        
        if( $request->user()->rol == 'comprador' || $request->user()->rol == 'coordinador'    )
        {
            return $next($request);
        }
       return back()->with('flash', 'Acceso restringido');
    }
}
