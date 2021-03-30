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
            $table->double('shelf_life');
            $table->decimal('total_pcs');
            $table->double('pcs_unit');
            $table->decimal('pcs_inner_box');
            $table->decimal('pcs_ctn');
            $table->decimal('ctn_packing_size_l');
            $table->decimal('ctn_packing_size_w');
            $table->decimal('ctn_packing_size_h');
            $table->decimal('cbm');
            $table->decimal('n_w_ctn');
            $table->decimal('g_w_ctn');
            $table->decimal('total_ctn');
            $table->decimal('corregido_total_pcs');
            $table->decimal('total_cbm');
            $table->decimal('total_n_w');
            $table->decimal('total_g_w');
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
