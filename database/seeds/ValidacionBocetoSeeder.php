<?php

use Illuminate\Database\Seeder;

class ValidacionBocetoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('validacion_bocetos')->insert([
            'arte_id' => 1,
            'user_id' => 1,
            'titulo' => 'Creacion de la validacion',
            'descripcion' => 'Se creo la validacion sin problemas',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        
        DB::table('validacion_bocetos')->insert([
            'arte_id' => 2,
            'user_id' => 1,
            'titulo' => 'la validacion no esta bien',
            'descripcion' => 'la validacion tiene problemas de diseño',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('validacion_bocetos')->insert([
            'arte_id' => 3,
            'user_id' => 3,
            'titulo' => 'Validacion finalizada',
            'descripcion' => 'Se culminó la validacion exitosamente',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('validacion_bocetos')->insert([
            'arte_id' => 1,
            'user_id' => 2,
            'titulo' => 'Modificacion de diseño',
            'descripcion' => 'Se modifican algunos diseños en la validacion',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
