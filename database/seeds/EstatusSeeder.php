<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('estatus')->insert([
            'estatus' => 'Sin Iniciar',
        ]);

        DB::table('estatus')->insert([
            'estatus' => 'En Proceso',
        ]);

        DB::table('estatus')->insert([
            'estatus' => 'Finalizado',
        ]);
    }
}
