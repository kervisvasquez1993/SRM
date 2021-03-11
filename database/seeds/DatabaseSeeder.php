<?php

use App\ProduccionTransito;
use App\ValidacionBocetoStatu;
use App\ValidacionFichaStatu;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RolesSeeder::class); 
        $this->call(UserSeeder::class); 
        $this->call(TareaSeeder::class); 
        $this->call(ProveedorSeeder::class); 
        $this->call(PivotSeeder::class); 
        $this->call(BocetoStatusSeeder::class);
        $this->call(ConfirmacionProveedorSeeder::class);
        $this->call(FichasStatusSeeder::class);
        $this->call(ValidacionFichasStatusSeeder::class);
        $this->call(ValidacionBocetoStatusSeeder::class);
        $this->call(ArteSeeder::class);
        $this->call(ProductoSeeder::class);
        $this->call(ProduccionTransitoSeeder::class);
        $this->call(PerfilSeeder::class);
        

    }
}
