<?php

use App\Proveedor;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProveedorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = Proveedor::create([
            'nombre' => 'empresa1',
            'pais' => 'venezuela',
            'ciudad' => 'carabobo',
            'descripcion'=> 'esto es una descripcion',
            'archivos_src' => 'imagenurl',
            
         ]);

         DB::table('proveedors')->insert([
            'nombre' => 'empresa2',
            'pais' => 'venezuela',
            'ciudad' => 'carabobo',
            'descripcion'=> 'esto es una descripcion',
            'archivos_src' => 'imagenurl',
            
         ]);
    }
}
