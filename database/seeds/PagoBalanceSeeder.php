<?php

use Illuminate\Database\Seeder;

class PagoBalanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('pago_balances')->insert([
            'pago_anticipado_id' => 1,
            'produccion_transito_id' => 1,
            'titulo' => 'Primer pago Balance',
            'fecha_pago' => date('Y-m-d H:i:s'),
            'file_pago' => 'path/pagoBalance.png',
            'monto_total' => 1200,
            'pago_completo' => true,
            'descripcion' => 'Descripcion del pago',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('pago_balances')->insert([
            'pago_anticipado_id' => 2,
            'produccion_transito_id' => 2,
            'titulo' => 'segundo pago Balance',
            'fecha_pago' => date('Y-m-d H:i:s'),
            'file_pago' => 'path/pagoBalance.png',
            'monto_total' => 850,
            'pago_completo' => false,
            'descripcion' => 'Descripcion del pago',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('pago_balances')->insert([
            'pago_anticipado_id' => 2,
            'produccion_transito_id' => 1,
            'titulo' => 'tercero pago Balance',
            'fecha_pago' => date('Y-m-d H:i:s'),
            'file_pago' => 'path/pagoBalance.png',
            'monto_total' => 1000,
            'pago_completo' => true,
            'descripcion' => 'Descripcion del pago',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
