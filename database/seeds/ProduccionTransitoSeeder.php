<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProduccionTransitoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('produccion_transitos')->insert([
            'pivot_tarea_proveeder_id' => 1,
            'inicio_produccion' => true,
            'fin_produccion' => true,
            'pago_balance' => true,
            'transito_nacionalizacion' => true,
            'fin_produccion_transito' => true,
            'recepcion_mercancia' => true,
            'inspeccion_carga' => true,
            'reclamos_devoluciones' => true  
        ]);
    }
}
