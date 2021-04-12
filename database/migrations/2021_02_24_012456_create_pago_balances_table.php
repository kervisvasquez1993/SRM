<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePagoBalancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pago_balances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pago_anticipado_id')->references('id')->on('pago_anticipados');
            $table->foreignId('produccion_transito_id')->references('id')->on('produccion_transitos');
            $table->timestamp('fecha_pago_balance');
            $table->string('file_pago_balance');
            $table->boolean('pago_completo')->default(false);
            $table->text('descripcion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pago_balances');
    }
}
