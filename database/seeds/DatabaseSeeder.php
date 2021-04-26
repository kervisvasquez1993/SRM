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
        
        $this->call(UserSeeder::class); 
        $this->call(TareaSeeder::class); 
        $this->call(ProveedorSeeder::class); 
        $this->call(PivotSeeder::class); 
        $this->call(EstatusSeeder::class);
        $this->call(ArteSeeder::class);
        $this->call(BocetoSeeder::class);
        $this->call(ProductoSeeder::class);
        $this->call(ProduccionTransitoSeeder::class);
        $this->call(PerfilSeeder::class);
        $this->call(ValidacionBocetoSeeder::class);
        $this->call(FichaSeeder::class);
        $this->call(ValidacionFichaSeeder::class);
        $this->call(InicioProduccionSeeder::class);
        $this->call(ConfirmacionProveedorSeeder::class);
        $this->call(ProduccionTransitoSeeder::class);
        $this->call(PagoAnticipadoSeeder::class);
        $this->call(PagoBalanceSeeder::class);
        $this->call(TransitoNacionalizacionSeeder::class);
        $this->call(FinProduccionSeeder::class);
        $this->call(RecepcionReclamosDevolucionesSeeder::class);
        $this->call(RecepcionMercanciaSeeder::class);
        $this->call(InspeccionCargaSeeder::class);
        $this->call(ReclamosDevolucionesSeeder::class);
    }
}
