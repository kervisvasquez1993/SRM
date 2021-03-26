<?php

use Illuminate\Database\Seeder;

class ConfirmacionProveedorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('confirmacion_proveedors')->insert([
            'arte_id' => 1,
            'user_id' => 1,
            'titulo' => 'Creacion de la validacion ficha',
            'descripcion' => 'Se creo la validacion ficha sin problemas',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        
        DB::table('confirmacion_proveedors')->insert([
            'arte_id' => 2,
            'user_id' => 1,
            'titulo' => 'la validacion ficha no esta bien',
            'descripcion' => 'la validacion ficha tiene problemas de diseño',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('confirmacion_proveedors')->insert([
            'arte_id' => 3,
            'user_id' => 3,
            'titulo' => 'validacion ficha finalizada',
            'descripcion' => 'Se culminó la validacion ficha exitosamente',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('confirmacion_proveedors')->insert([
            'arte_id' => 1,
            'user_id' => 2,
            'titulo' => 'Modificacion de diseño',
            'descripcion' => 'Se modifican algunos diseños en la validacion ficha',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
    
}
