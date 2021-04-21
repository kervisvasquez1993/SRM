<?php

use Illuminate\Database\Seeder;

class RecepcionMercanciaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('recepcion_mercancias')->insert([
            'recepcion_reclamo_devolucions_id' => 1,
            'titulo' => 'Primera incidencia',
            'descripcion' => 'Descripcion del pago',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('recepcion_mercancias')->insert([
            'recepcion_reclamo_devolucions_id' => 2,
            'titulo' => 'segunda incidencia',
            'descripcion' => 'Descripcion del pago',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('recepcion_mercancias')->insert([
            'recepcion_reclamo_devolucions_id' => 3,
            'titulo' => 'tercera incidencia',
            'descripcion' => 'Descripcion del pago',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('recepcion_mercancias')->insert([
            'recepcion_reclamo_devolucions_id' => 1,
            'titulo' => 'cuarta incidencia',
            'descripcion' => 'Descripcion del pago',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
