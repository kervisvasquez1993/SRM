<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComprasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('compras', function (Blueprint $table) {
            $table->id();
            $table->string('orden_compra');
            $table->foreignId('pivot_tarea_proveeders_id')->references('id')->on('pivot_tarea_proveeders');
            $table->string('item');
            $table->text('descripcion');
            $table->string('registro_salud');
            $table->double('cantidad_pcs');
            $table->double('total');
            $table->unsignedBigInteger('comprador');
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
        Schema::dropIfExists('compras');
    }
}
