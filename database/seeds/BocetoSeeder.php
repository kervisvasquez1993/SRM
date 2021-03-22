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
            'titulo' => 'Creacion del boceto',
            'descripcion' => 'Se creo el boceto sin problemas',
        ]);
        
        DB::table('bocetos')->insert([
            'arte_id' => 2,
            'titulo' => 'El boceto no esta bien',
            'descripcion' => 'El boceto tiene problemas de diseño',
        ]);
        DB::table('bocetos')->insert([
            'arte_id' => 3,
            'titulo' => 'Boceto finalizado',
            'descripcion' => 'Se culminó el boceto exitosamente',
        ]);
        DB::table('bocetos')->insert([
            'arte_id' => 1,
            'titulo' => 'Modificacion de diseño',
            'descripcion' => 'Se modifican algunos diseños en el boceto',
        ]);

    }
}
