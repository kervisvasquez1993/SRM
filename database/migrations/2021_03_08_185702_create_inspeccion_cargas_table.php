<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInspeccionCargasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inspeccion_cargas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recepcion_reclamo_devolucion_id')->references('id')->on('recepcion_reclamo_devolucions');
            $table->foreignId('user_id')->references('id')->on('users');
            $table->string('titulo');
            $table->text('descripcion');
            $table->softDeletes();
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
        Schema::dropIfExists('inspeccion_cargas');
    }
}
