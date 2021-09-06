<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComparacionCeldaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comparacion_celdas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fila_id')->references('id')->on('comparacion_filas')->onDelete('cascade');
            $table->foreignId('proveedor_id')->references('id')->on('proveedors')->onDelete('cascade');
            $table->biginteger('producto_id')->references('id')->on('productos')->onDelete('cascade');
            $table->integer('orden');
            $table->string('color')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comparacion_celdas');
    }
}
