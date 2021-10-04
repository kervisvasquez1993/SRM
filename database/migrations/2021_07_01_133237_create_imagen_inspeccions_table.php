<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImagenInspeccionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('imagen_inspeccions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recepcion_reclamo_devolucion_id')->references('id')->on('recepcion_reclamo_devolucions')->onDelete('cascade');
            $table->string('url');
            $table->string('name');
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
        Schema::dropIfExists('imagen_inspeccions');
    }
}
