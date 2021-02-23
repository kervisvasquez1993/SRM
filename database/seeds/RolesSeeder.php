<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rol1 = DB::table('rols')->insert([
            'nombre' => 'Coordinador'
        ]);
        $rol2 = DB::table('rols')->insert([
            'nombre' => 'Comprador'
        ]);
        $rol1 = DB::table('rols')->insert([
            'nombre' => 'logistica'
        ]);
    }
}
