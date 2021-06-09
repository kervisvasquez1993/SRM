<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePagoAnticipadosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pago_anticipados', function (Blueprint $table) {
            $table->id();
            $table->foreignId('produccion_transito_id')->references('id')->on('produccion_transitos');
            $table->foreignId('user_id')->references('id')->on('users');
            $table->string('titulo');
            $table->double('monto_pagado');
            $table->string('file_pago');
            $table->timestamp('fecha_pago');
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
        Schema::dropIfExists('pago_anticipados');
    }
}
