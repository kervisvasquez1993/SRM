<?php

use Illuminate\Database\Seeder;

class ReclamosDevolucionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('reclamos_devoluciones')->insert([
            'recepcion_reclamo_devolucion_id' => 1,
            'titulo' => 'Primera incidencia',
            'descripcion' => 'Descripcion de reclamo',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('reclamos_devoluciones')->insert([
            'recepcion_reclamo_devolucion_id' => 2,
            'titulo' => 'segunda incidencia',
            'descripcion' => 'Descripcion de reclamo',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('reclamos_devoluciones')->insert([
            'recepcion_reclamo_devolucion_id' => 3,
            'titulo' => 'tercera incidencia',
            'descripcion' => 'Descripcion de reclamo',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('reclamos_devoluciones')->insert([
            'recepcion_reclamo_devolucion_id' => 1,
            'titulo' => 'cuarta incidencia',
            'descripcion' => 'Descripcion de reclamo',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
