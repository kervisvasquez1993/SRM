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
            $table->foreignId('pivot_tarea_proveeder_id')->references('id')->on('pivot_tarea_proveeders')->onDelete('cascade');
            $table->boolean('inicio_produccion')->default(false);
            $table->date('inicio_produccion_fecha')->nullable();
            $table->boolean('fin_produccion')->default(false);
            $table->date('fin_produccion_fecha')->nullable();
            $table->boolean('salida_puerto_origen')->default(false);
            $table->date('salida_puerto_origen_fecha')->nullable();
            $table->boolean('transito')->default(false);
            $table->date('transito_fecha')->nullable();
            $table->boolean('nacionalizacion')->default(false);
            $table->date('nacionalizacion_fecha')->nullable();
            $table->date('fecha_entrega_aproximada')->nullable();
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
        Schema::dropIfExists('produccion_transitos');
    }
}
