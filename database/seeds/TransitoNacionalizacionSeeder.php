<?php

use Illuminate\Database\Seeder;

class TransitoNacionalizacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('transito_nacionalizacions')->insert([
            'produccion_transito_id' => 1,
            'titulo' => 'Primer transito',
            'descripcion' => 'Descripcion del transito',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('transito_nacionalizacions')->insert([
            'produccion_transito_id' => 2,
            'titulo' => 'Segundo transito',
            'descripcion' => 'Descripcion del transito',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('transito_nacionalizacions')->insert([
            'produccion_transito_id' => 1,
            'titulo' => 'Tercer transito',
            'descripcion' => 'Descripcion del transito',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
