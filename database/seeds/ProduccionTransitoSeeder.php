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
        ]);

        DB::table('produccion_transitos')->insert([
            'pivot_tarea_proveeder_id' => 1,
            'inicio_produccion' => true,
            'fin_produccion' => false,
            'pago_balance' => true,
            'transito_nacionalizacion' => true,
            'fin_produccion_transito' => false,
        ]);

        DB::table('produccion_transitos')->insert([
            'pivot_tarea_proveeder_id' => 1,
            'inicio_produccion' => true,
            'fin_produccion' => true,
            'pago_balance' => false,
            'transito_nacionalizacion' => false,
            'fin_produccion_transito' => false,
        ]);
    }
}
