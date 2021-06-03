<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pivot_id')->references('id')->on('pivot_tarea_proveeders')->onDelete('cascade');
            $table->string('hs_code')->nullable();
            $table->string('product_code')->nullable();
            $table->string('brand')->nullable();
            $table->string('product_name')->nullable();
            $table->string ('description')->nullable();
            $table->double('shelf_life')->nullable();
            $table->double('total_pcs',  )->nullable();
            $table->double('pcs_unit', )->nullable();
            $table->double('pcs_inner_box', )->nullable()->default('0');
            $table->double('pcs_ctn', )->nullable();
            $table->double('ctn_packing_size_l', )->nullable();
            $table->double('ctn_packing_size_w', )->nullable();
            $table->double('ctn_packing_size_h', )->nullable();
            $table->double('cbm', )->nullable();
            $table->double('n_w_ctn', )->nullable();
            $table->double('g_w_ctn',)->nullable();
            $table->double('total_ctn', )->nullable();
            $table->double('corregido_total_pcs', )->nullable();
            $table->double('total_cbm',)->nullable();
            $table->double('total_n_w',)->nullable();
            $table->double('total_g_w')->nullable();
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
        Schema::dropIfExists('productos');
    }
}
