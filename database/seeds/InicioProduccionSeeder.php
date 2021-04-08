<?php

use Illuminate\Database\Seeder;

class InicioProduccionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('inicio_produccions')->insert([
            'produccion_transito_id' => 1,
            'titulo' => 'Incidencia de inicio de produccion',
            'descripcion' => 'Descripcion de la Incidencia de inicio de produccion',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('inicio_produccions')->insert([
            'produccion_transito_id' => 2,
            'titulo' => 'Otra Incidencia de inicio de produccion',
            'descripcion' => 'Descripcion de la Incidencia de inicio de produccion',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('inicio_produccions')->insert([
            'produccion_transito_id' => 1,
            'titulo' => 'Tercera Incidencia de inicio de produccion',
            'descripcion' => 'Descripcion de la Incidencia de inicio de produccion',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
