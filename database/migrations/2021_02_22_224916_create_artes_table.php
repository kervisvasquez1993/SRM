<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArtesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('artes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pivot_tarea_proveeder_id')->references('id')->on('pivot_tarea_proveeders');
            $table->string('nombre');
            $table->foreignId('creacion_fichas')->references('id')->on('estatus');
            $table->foreignId('validacion_fichas')->references('id')->on('estatus');
            $table->foreignId('creacion_boceto')->references('id')->on('estatus');
            $table->foreignId('validacion_boceto')->references('id')->on('estatus');
            $table->foreignId('confirmacion_proveedor')->references('id')->on('estatus');
            $table->timestamp('fecha_fin');
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
        Schema::dropIfExists('artes');
    }
}
