<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTareasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tareas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sender_id');
            $table->foreignId('user_id')->references('id')->on('users');
            $table->string('nombre')->default('Sin Definir');
            $table->text('descripcion')->default('Sin Descripción');
            $table->date('fecha_fin')->nullable();

            // Exportación de comparaciones
            $table->timestamp('comparacion_editadas_en')->nullable();
            $table->string('archivo_comparacion')->nullable();
            $table->timestamp('archivo_comparacion_creado_en')->nullable();

            // Otro
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
        Schema::dropIfExists('tareas');
    }
}
