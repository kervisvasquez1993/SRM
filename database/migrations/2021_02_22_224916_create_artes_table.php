<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArtesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('artes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pivot_tarea_proveeder_id')->references('id')->on('pivot_tarea_proveeders');
            $table->string('nombre');
            $table->enum('creacion_fichas', ['sin_inicializar', 'en_proceso', 'finalizado'])->default('sin_inicializar');
            $table->enum('validacion_fichas', ['sin_inicializar', 'en_proceso', 'finalizado'])->default('sin_inicializar');
            $table->enum('creacion_boceto',['sin_inicializar', 'en_proceso', 'finalizado'])->default('sin_inicializar');
            $table->enum('validacion_boceto',['sin_inicializar', 'en_proceso', 'finalizado'])->default('sin_inicializar');
            $table->enum('confirmacion_proveedor', ['sin_inicializar', 'en_proceso', 'finalizado'])->default('sin_inicializar');
            $table->timestamp('fecha_fin');
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
        Schema::dropIfExists('artes');
    }
}
