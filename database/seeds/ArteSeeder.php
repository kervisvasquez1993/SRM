<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('artes')->insert([
            'pivot_tarea_proveeder_id' => 1,
            'nombre' => 'arte1',
            'creacion_fichas' => true,
            'validacion_fichas' => true,
            'creacion_boceto' => true,
            'validacion_boceto' => true,
            'confirmacion_proveedor' => true,
            'fecha_fin' => Carbon::now()
        ]);
    }
}
