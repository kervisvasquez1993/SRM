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
            'fecha_pago_balance' => date('Y-m-d H:i:s'),
            'file_pago_balance' => 'path/pagoBalance.png',
            'pago_completo' => true,
            'descripcion' => date('Y-m-d H:i:s'),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('pago_balances')->insert([
            'pago_anticipado_id' => 2,
            'produccion_transito_id' => 2,
            'fecha_pago_balance' => date('Y-m-d H:i:s'),
            'file_pago_balance' => 'path/pagoBalance.png',
            'pago_completo' => true,
            'descripcion' => date('Y-m-d H:i:s'),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('pago_balances')->insert([
            'pago_anticipado_id' => 2,
            'produccion_transito_id' => 1,
            'fecha_pago_balance' => date('Y-m-d H:i:s'),
            'file_pago_balance' => 'path/pagoBalance.png',
            'pago_completo' => true,
            'descripcion' => date('Y-m-d H:i:s'),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
