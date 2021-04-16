<?php

use Illuminate\Database\Seeder;

class FinProduccionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('fin_produccions')->insert([
            'produccion_transito_id' => 1,
            'titulo' => 'Primer fin',
            'descripcion' => 'Descripcion del fin',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('fin_produccions')->insert([
            'produccion_transito_id' => 2,
            'titulo' => 'Segundo fin',
            'descripcion' => 'Descripcion del fin',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('fin_produccions')->insert([
            'produccion_transito_id' => 1,
            'titulo' => 'Tercer fin',
            'descripcion' => 'Descripcion del fin',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
