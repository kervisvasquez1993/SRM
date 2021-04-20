<?php

use Illuminate\Database\Seeder;

class RecepcionReclamosDevolucionesSeeder extends Seeder
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
            'recepcion_mercancia' => 1,
            'inspeccion_carga' => 0,
            'reclamos_devoluciones' => 0,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('recepcion_reclamo_devolucions')->insert([
            'produccion_transito_id' => 1,
            'recepcion_mercancia' => 0,
            'inspeccion_carga' => 1,
            'reclamos_devoluciones' => 1,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('recepcion_reclamo_devolucions')->insert([
            'produccion_transito_id' => 1,
            'recepcion_mercancia' => 1,
            'inspeccion_carga' => 0,
            'reclamos_devoluciones' => 1,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('recepcion_reclamo_devolucions')->insert([
            'produccion_transito_id' => 1,
            'recepcion_mercancia' => 1,
            'inspeccion_carga' => 1,
            'reclamos_devoluciones' => 0,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
