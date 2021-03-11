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
            'boceto_status_id' => 1,
            'validacion_boceto_status_id' => 1,
            'ficha_status_id' => 1,
            'validacion_ficha_status_id' => 1,
            'confirmacion_proveedor_estatus_id' => 1,
            'fecha_fin' => Carbon::now()
        ]);
    }
}
