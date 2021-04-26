<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReclamosDevolucionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reclamos_devoluciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recepcion_reclamo_devolucion_id')->references('id')->on('recepcion_reclamo_devolucions');
            $table->string('titulo');
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
        Schema::dropIfExists('reclamos_devoluciones');
    }
}
