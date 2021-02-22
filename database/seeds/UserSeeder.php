<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'kervis vasquez',
            'rol_id' => "1",
            'email' => 'kervisvasquez24@gmail.com',
            'password' =>Hash::make("123456789"),
            
        ]);

        DB::table('users')->insert([
            'name' => 'Juan',
            'rol_id' => "1",
            'email' => 'juan@gmail.com',
            'password' =>Hash::make("123456789"),
        ]);

        DB::table('users')->insert([
            'name' => 'pedro',
            'rol_id' => "1",
            'email' => 'pedro@gmail.com',
            'password' =>Hash::make("123456789"),
            
        ]);

        DB::table('users')->insert([
            'name' => 'jesus',
            'rol_id' => "1",
            'email' => 'jesus@gmail.com',
            'password' =>Hash::make("123456789"),
            
        ]);
    }
}
