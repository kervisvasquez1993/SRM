<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComparacionCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comparacion_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('comparacion_id')->references('id')->on('comparaciones')->onDelete('cascade');
            $table->foreignId('proveedor_id')->references('id')->on('proveedors')->onDelete('cascade');
            $table->biginteger('producto_id');
            $table->integer('fila');
            $table->integer('sub_fila');
            $table->string('color');
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
        Schema::dropIfExists('comparacion_cards');
    }
}
