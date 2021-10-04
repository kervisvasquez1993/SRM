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
            $table->foreignId('produccion_transito_id')->references('id')->on('produccion_transitos')->onDelete('cascade');
            $table->boolean('recepcion_mercancia')->default(false);
            $table->boolean('inspeccion_carga')->default(false);
            $table->boolean('reclamos_devoluciones')->default(false);
            $table->text('descripcion_inspeccion')->nullable();

            // Cabecera del excel
            $table->string('fecha_recepcion_mercancia')->nullable();
            $table->string('hora_llegada_contenedor')->nullable();
            $table->string('hora_salida_contenedor')->nullable();
            $table->string('numero_precinto')->nullable();
            $table->string('numero_oc')->nullable();
            $table->string('numero_factura')->nullable();
            $table->string('comprador')->nullable();
            $table->string('importador')->nullable();
            $table->string('elaborado_por')->nullable();
            $table->string('verificado_por')->nullable();
            $table->string('aprobado_por')->nullable();

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
