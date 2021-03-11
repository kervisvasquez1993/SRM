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
            $table->foreignId('boceto_status_id')->references('id')->on('boceto_status');
            $table->foreignId('validacion_boceto_status_id')->references('id')->on('validacion_ficha_status');
            $table->foreignId('ficha_status_id')->references('id')->on('ficha_status');
            $table->foreignId('validacion_ficha_status_id')->references('id')->on('validacion_boceto_status');
            $table->foreignId('confirmacion_proveedor_estatus_id')->references('id')->on('confirmacion_proveedor_statuses');
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
