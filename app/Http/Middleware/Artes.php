<?php

namespace App\Http\Middleware;

use Closure;

class Artes
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
        
        if( $request->user()->rol == 'artes' || $request->user()->rol == 'coordinador'    )
        {
            return $next($request);
        }
       return back()->with('message', 'Acceso restringido');
    }
}
