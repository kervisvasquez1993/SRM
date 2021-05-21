<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReclamosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('recepcion_reclamo_devolucions')->insert([
            'produccion_transito_id' => 1,
            'recepcion_mercancia' => true,
            'inspeccion_carga' => true,
            'reclamos_devoluciones' => true  
        ]);
    }
}
