<?php

use Illuminate\Support\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PerfilSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('perfils')->insert([
            'user_id' => 2,
            'biografia' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique id arcu quis tincidunt. Cras porta facilisis est, vel suscipit quam vehicula ac. Pellentesque sollicitudin massa in ex luctus rhoncus. Nunc sed sem diam. Aenean semper ligula vel fermentum suscipit. Vivamus ac nunc sagittis, dapibus dui quis, molestie quam. Donec condimentum consectetur dolor, et sollicitudin enim efficitur laoreet. Donec ornare gravida est quis consectetur.',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
