<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TareaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tarea1 = DB::table('tareas')->insert([ 'user_id' => '1',
        'nombre' => 'tasks1',
        'descripcion' => 'Lorem Ipsum es simplemente texto de relleno de la industria de la impresión y la composición tipográfica.
                         Lorem Ipsum ha sido el texto de relleno estándar de la industria desde el siglo XVI, cuando un impresor 
                         desconocido tomó una galera de tipos y la mezcló para hacer un libro de muestras tipográficas. Ha sobrevivido 
                         no solo a cinco siglos, sino también al salto a la composición tipográfica electrónica, permaneciendo esencialmente 
                         sin cambios. Se popularizó en la década de 1960 con el lanzamiento de hojas de Letraset que contienen pasajes
                         de Lorem Ipsum y, 
                         más recientemente, con software de autoedición como Aldus PageMaker que incluye versiones de Lorem Ipsum.',
        'fecha_fin' => Carbon::now(),
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now()]);

        DB::table('tareas')->insert([
            'user_id' => '1',
            'nombre' => 'tasks2',
            'descripcion' => 'Lorem Ipsum es simplemente texto de relleno de la industria de la impresión y la composición tipográfica.
                             Lorem Ipsum ha sido el texto de relleno estándar de la industria desde el siglo XVI, cuando un impresor 
                             desconocido tomó una galera de tipos y la mezcló para hacer un libro de muestras tipográficas. Ha sobrevivido 
                             no solo a cinco siglos, sino también al salto a la composición tipográfica electrónica, permaneciendo esencialmente 
                             sin cambios. Se popularizó en la década de 1960 con el lanzamiento de hojas de Letraset que contienen pasajes
                             de Lorem Ipsum y, 
                             más recientemente, con software de autoedición como Aldus PageMaker que incluye versiones de Lorem Ipsum.',
            'fecha_fin' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()    
        ]);
    }
}
