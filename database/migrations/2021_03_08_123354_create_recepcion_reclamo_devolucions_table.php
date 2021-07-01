<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecepcionReclamoDevolucionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recepcion_reclamo_devolucions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('produccion_transito_id')->references('id')->on('produccion_transitos');
            $table->boolean('recepcion_mercancia')->default(false);
            $table->boolean('inspeccion_carga')->default(false);
            $table->boolean('reclamos_devoluciones')->default(false);
            $table->text('descripcion_inspeccion')->nullable();
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
        Schema::dropIfExists('recepcion_reclamo_devolucions');
    }
}
