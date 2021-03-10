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
            $table->enum('creacion_fichas', ['Por Iniciar', ' En Proceso', 'Finalizado'])->default('Finalizado');
            $table->enum('validacion_fichas', ['Por Iniciar', ' En Proceso', 'Finalizado'])->default('Por Iniciar');
            $table->enum('creacion_boceto', ['Por Iniciar', ' En Proceso', 'Finalizado'])->default('Por Iniciar');
            $table->enum('validacion_boceto', ['Por Iniciar', ' En Proceso', 'Finalizado'])->default('Por Iniciar');
            $table->enum('confirmacion_proveedor', ['Por Iniciar', ' En Proceso', 'Finalizado'])->default('Por Iniciar');
            $table->timestamp('fecha_fin');
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
