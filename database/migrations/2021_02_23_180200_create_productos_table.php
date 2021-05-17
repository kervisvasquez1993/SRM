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
            $table->foreignId('proveedor_id')->references('id')->on('proveedors')->onDelete('cascade');
            $table->string('hs_code')->nullable();
            $table->string('product_code')->nullable();
            $table->string('brand')->nullable();
            $table->string('product_name')->nullable();
            $table->string('description')->nullable();
            $table->integer('shelf_life')->nullable();
            $table->integer('total_pcs',  )->nullable();
            $table->integer('pcs_unit', )->nullable();
            $table->integer('pcs_inner_box', )->nullable()->default('0');
            $table->integer('pcs_ctn', )->nullable();
            $table->integer('ctn_packing_size_l', )->nullable();
            $table->integer('ctn_packing_size_w', )->nullable();
            $table->integer('ctn_packing_size_h', )->nullable();
            $table->integer('cbm', )->nullable();
            $table->integer('n_w_ctn', )->nullable();
            $table->integer('g_w_ctn',)->nullable();
            $table->integer('total_ctn', )->nullable();
            $table->integer('corregido_total_pcs', )->nullable();
            $table->integer('total_cbm',)->nullable();
            $table->integer('total_n_w',)->nullable();
            $table->integer('total_g_w')->nullable();
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
