<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilterProduccionTransitosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('filter_produccion_transitos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proveedor_id')->references('id')->on('proveedors');
            $table->foreignId('user_id')->references('id')->on('users');
            $table->foreignId('produccion_transitos_id')->references('id')->on('produccion_transitos');
            $table->foreignId('pivot_tarea_proveedor_id')->references('id')->on('pivot_tarea_proveeders');
            $table->integer('code_unit');
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
        Schema::dropIfExists('filter_produccion_transitos');
    }
}
