<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateValidacionFichasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('validacion_fichas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('arte_id')->references('id')->on('artes');
            $table->foreignId('user_id')->references('id')->on('users');
            $table->string('titulo');
            $table->text('descripcion');
            $table->boolean('enabled')->default(true);
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
        Schema::dropIfExists('validacion_fichas');
    }
}
