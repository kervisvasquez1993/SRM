<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNegociacionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('negociacions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pivot_tarea_proveeder')->references('id')->on('pivot_tarea_proveeders')->onDelete('cascade');
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
        Schema::dropIfExists('negociacions');
    }
}
