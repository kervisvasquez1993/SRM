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
            $table->string('shelf_life')->nullable();
            $table->string('total_pcs',  )->nullable();
            $table->string('pcs_unit', )->nullable();
            $table->string('pcs_inner_box', )->nullable()->default('0');
            $table->string('pcs_ctn', )->nullable();
            $table->string('ctn_packing_size_l', )->nullable();
            $table->string('ctn_packing_size_w', )->nullable();
            $table->string('ctn_packing_size_h', )->nullable();
            $table->string('cbm', )->nullable();
            $table->string('n_w_ctn', )->nullable();
            $table->string('g_w_ctn',)->nullable();
            $table->string('total_ctn', )->nullable();
            $table->string('corregido_total_pcs', )->nullable();
            $table->string('total_cbm',)->nullable();
            $table->string('total_n_w',)->nullable();
            $table->string('total_g_w')->nullable();
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
