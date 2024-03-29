<?php

use Illuminate\Support\Carbon;
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
            'rol' => "coordinador",
            'email' => 'kervisvasquez24@gmail.com',
            'password' =>Hash::make("123456789"),
            'created_at' => Carbon::now()
        ]);

        DB::table('users')->insert([
            'name' => 'admin',
            'rol' => "coordinador",
            'email' => 'admin@gmail.com',
            'password' =>Hash::make("admin"),
            'created_at' => Carbon::now()
        ]);

        DB::table('users')->insert([
            'name' => 'Juan',
            'rol' => "observador",
            'email' => 'juan@gmail.com',
            'password' =>Hash::make("123456789"),
            'created_at' => Carbon::now()
        ]);

        DB::table('users')->insert([
            'name' => 'pedro',
            'rol' => "comprador",
            'email' => 'pedro@gmail.com',
            'password' =>Hash::make("123456789"),
            'created_at' => Carbon::now()
            
        ]);

        DB::table('users')->insert([
            'name' => 'Jesus',
            'rol' => "comprador",
            'email' => 'jesus@gmail.com',
            'password' =>Hash::make("123456789"),
            'created_at' => Carbon::now()
        ]);

        DB::table('users')->insert([
            'name' => 'Arte',
            'rol' => "artes",
            'email' => 'arte@gmail.com',
            'password' =>Hash::make("123456789"),
            'created_at' => Carbon::now()
        ]);

        DB::table('users')->insert([
            'name' => 'Almacen',
            'rol' => "almacen",
            'email' => 'almacen@gmail.com',
            'password' =>Hash::make("123456789"),
            'created_at' => Carbon::now()
        ]);



        DB::table('users')->insert([
            'name' => 'Logistica',
            'rol' => "logistica",
            'email' => 'logistica@gmail.com',
            'password' =>Hash::make("123456789"),
            'created_at' => Carbon::now()
        ]);
    }
}
