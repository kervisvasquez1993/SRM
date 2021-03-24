<?php

use Illuminate\Database\Seeder;

class BocetoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('bocetos')->insert([
            'arte_id' => 1,
            'user_id' => 1,
            'titulo' => 'Creacion del boceto',
            'descripcion' => 'Se creo el boceto sin problemas',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        
        DB::table('bocetos')->insert([
            'arte_id' => 2,
            'user_id' => 1,
            'titulo' => 'El boceto no esta bien',
            'descripcion' => 'El boceto tiene problemas de diseño',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('bocetos')->insert([
            'arte_id' => 3,
            'user_id' => 3,
            'titulo' => 'Boceto finalizado',
            'descripcion' => 'Se culminó el boceto exitosamente',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('bocetos')->insert([
            'arte_id' => 1,
            'user_id' => 2,
            'titulo' => 'Modificacion de diseño',
            'descripcion' => 'Se modifican algunos diseños en el boceto',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

    }
}
