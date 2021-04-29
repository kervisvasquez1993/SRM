<?php

use Illuminate\Database\Seeder;

class PagoAnticipadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('pago_anticipados')->insert([
            'produccion_transito_id' => 1,
            'user_id' => 1,
            'titulo' => 'Primer anticipo',
            'monto_total' => 1200,
            'porcentaje' => 45,
            'file_pago' => 'path/pago.png',
            'fecha_pago' => date('Y-m-d H:i:s'),
            'descripcion' => 'Pago del primer anticipo',
            'fecha_pago' => date('Y-m-d H:i:s'),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('pago_anticipados')->insert([
            'produccion_transito_id' => 2,
            'user_id' => 1,
            'titulo' => 'Segundo anticipo',
            'monto_total' => 850,
            'porcentaje' => 50,
            'file_pago' => 'path/pago.png',
            'fecha_pago' => date('Y-m-d H:i:s'),
            'descripcion' => 'Pago del segundo anticipo',
            'fecha_pago' => date('Y-m-d H:i:s'),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        DB::table('pago_anticipados')->insert([
            'produccion_transito_id' => 1,
            'user_id' => 1,
            'titulo' => 'Un anticipo',
            'monto_total' => 2400,
            'porcentaje' => 60,
            'file_pago' => 'path/pago.png',
            'fecha_pago' => date('Y-m-d H:i:s'),
            'descripcion' => 'Pago de un anticipo',
            'fecha_pago' => date('Y-m-d H:i:s'),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
