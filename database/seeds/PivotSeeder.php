<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PivotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('pivot_tarea_proveeders')->insert([
            'tarea_id' => '1',
            'proveedor_id' => '1',
            'iniciar_negociacion' => false,
            'iniciar_arte' => false,
            'iniciar_produccion' => false

            ]);
    }
}
