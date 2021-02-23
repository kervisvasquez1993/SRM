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
            $table->string('hs_code');
            $table->string('product_code');
            $table->string('brand');
            $table->string('product_name');
            $table->string('description');
            $table->string('shelf_life');
            $table->decimal('total_pcs');
            $table->decimal('pcs_unit');
            $table->decimal('pcs_inner_box');
            $table->decimal('psm_ctn');
            $table->double('ctn_packing_size_l');
            $table->double('ctn_packing_size_w');
            $table->double('ctn_packing_size_h');
            $table->double('cbm');
            $table->double('n_w_ctn');
            $table->double('g_w_ctn');
            $table->double('total_ctn');
            $table->double('corregido_total_pcs');
            $table->double('total_cbm');
            $table->double('total_n_w');
            $table->double('total_g_w');
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
