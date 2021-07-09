<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDraggebleTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('draggeble_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tarea_id')->references('id')->on('tareas');
            $table->integer('posiction_row')->default();
            $table->integer('position_column')->default();
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
        Schema::dropIfExists('draggeble_tasks');
    }
}
