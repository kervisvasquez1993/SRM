<?php

use Illuminate\Database\Seeder;

class InspeccionCargaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('inspeccion_cargas')->insert([
            'recepcion_reclamo_devolucion_id' => 1,
            'user_id' => 1,
            'titulo' => 'Primera incidencia',
            'descripcion' => 'Descripcion de inspeccion',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('inspeccion_cargas')->insert([
            'recepcion_reclamo_devolucion_id' => 2,
            'user_id' => 1,
            'titulo' => 'segunda incidencia',
            'descripcion' => 'Descripcion de inspeccion',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('inspeccion_cargas')->insert([
            'recepcion_reclamo_devolucion_id' => 3,
            'user_id' => 1,
            'titulo' => 'tercera incidencia',
            'descripcion' => 'Descripcion de inspeccion',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('inspeccion_cargas')->insert([
            'recepcion_reclamo_devolucion_id' => 1,
            'user_id' => 1,
            'titulo' => 'cuarta incidencia',
            'descripcion' => 'Descripcion de inspeccion',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
