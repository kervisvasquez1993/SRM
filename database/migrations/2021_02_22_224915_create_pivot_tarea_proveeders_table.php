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
            $table->boolean('iniciar_negociacion')->default(false);
            $table->boolean('iniciar_arte')->default(false);
            $table->boolean('iniciar_produccion')->default(false);
            $table->string('compra_po')->nullable()->default(null);
            $table->string('codigo_comprador')->nullable()->default(null);
            $table->string('payment_terms')->nullable()->default(null);
            $table->string('hs_code')->nullable()->default(null);
            $table->string('incoterms')->nullable()->default(null);
            $table->date('delivery_time')->nullable()->default(null);
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
