<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePivotTareaProveedersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pivot_tarea_proveeders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tarea_id')->references('id')->on('tareas')->onDelete('cascade');
            $table->foreignId('proveedor_id')->references('id')->on('proveedors')->onDelete('cascade');
            $table->boolean('productos_cargados')->default(false);
            $table->boolean('productos_confirmados')->default(false);
            $table->boolean('iniciar_arte')->default(false);
            $table->boolean('seleccionado')->default(false);
            $table->boolean('orden_compra')->default(false);
            $table->boolean('codigo_barra_finalizado')->default(false);
            $table->boolean('base_grafico_finalizado')->default(false);
            $table->boolean('iniciar_produccion')->default(false);
            $table->string('compra_po')->nullable()->default(null);
            $table->string('codigo_comprador')->nullable()->default(null);
            $table->string('payment_terms')->nullable()->default(null);
            $table->string('hs_code')->nullable()->default(null);
            $table->string('incoterms')->nullable()->default(null);
            $table->integer('delivery_time')->nullable()->default(null);
            $table->boolean('orden_compra_directa')->default(false);
            $table->string('archivo_orden_compra')->nullable();
            $table->string('nombre_archivo_orden_compra')->nullable();
            $table->double('total_pagar')->default(0)->nullable();

            // Exportacion de productos
            $table->timestamp('productos_editados_en')->nullable();
            $table->string('archivo_productos')->nullable();
            $table->timestamp('archivo_productos_creado_en')->nullable();

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
        Schema::dropIfExists('pivot_tarea_proveeders');
    }
}
