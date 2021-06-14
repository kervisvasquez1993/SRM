<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProduccionTransitosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('produccion_transitos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pivot_tarea_proveeder_id')->references('id')->on('pivot_tarea_proveeders');
            $table->boolean('pagos')->default(false);
            $table->boolean('inicio_produccion')->default(false);
            $table->boolean('fin_produccion')->default(false);
            $table->boolean('transito_nacionalizacion')->default(false);
            $table->boolean('fin_produccion_transito')->default(false);
            $table->boolean('salida_puero_origen')->default(false);
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
        Schema::dropIfExists('produccion_transitos');
    }
}
