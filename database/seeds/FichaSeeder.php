<?php

use Illuminate\Database\Seeder;

class FichaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('fichas')->insert([
            'arte_id' => 1,
            'user_id' => 1,
            'titulo' => 'Creacion de la ficha',
            'descripcion' => 'Se creo la ficha sin problemas',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        
        DB::table('fichas')->insert([
            'arte_id' => 2,
            'user_id' => 1,
            'titulo' => 'la ficha no esta bien',
            'descripcion' => 'la ficha tiene problemas de diseño',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('fichas')->insert([
            'arte_id' => 3,
            'user_id' => 3,
            'titulo' => 'ficha finalizada',
            'descripcion' => 'Se culminó la ficha exitosamente',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('fichas')->insert([
            'arte_id' => 1,
            'user_id' => 2,
            'titulo' => 'Modificacion de diseño',
            'descripcion' => 'Se modifican algunos diseños en la ficha',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
