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
            'creacion_fichas' => 1,
            'validacion_fichas' => 1,
            'creacion_boceto' => 1,
            'validacion_boceto' => 1,
            'confirmacion_proveedor' => 1,
            'fecha_fin' => Carbon::now()
        ]);
    }
}
