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
            $table->foreignId('pivot_tarea_proveeder_id')->references('id')->on('pivot_tarea_proveeders')->onDelete('cascade');
            $table->string('hs_code')->nullable();
            $table->string('product_code_supplier')->nullable();
            $table->string('product_name_supplier')->nullable();
            $table->string('brand_customer')->nullable();
            $table->string('sub_brand_customer')->nullable();
            $table->string('product_name_customer')->nullable();
            $table->string('description')->nullable();
            $table->string('imagen')->nullable();
            $table->double('shelf_life')->nullable();
            $table->double('total_pcs')->nullable();
            $table->double('unit_price')->nullable();
            $table->double('total_usd')->nullable();
            $table->double('pcs_unit_packing')->nullable();
            $table->double('pcs_inner1_box_paking', )->nullable();
            $table->double('pcs_inner2_box_paking', )->nullable();
            $table->double('pcs_ctn_paking', )->nullable();
            $table->double('ctn_packing_size_l', )->nullable();
            $table->double('ctn_packing_size_w', )->nullable();
            $table->double('ctn_packing_size_h', )->nullable();
            $table->double('cbm')->nullable();
            $table->double('n_w_ctn')->nullable();
            $table->double('g_w_ctn')->nullable();
            $table->double('total_ctn')->nullable();
            $table->double('corregido_total_pcs')->nullable();
            $table->double('total_cbm')->nullable();
            $table->double('total_n_w')->nullable();
            $table->double('total_g_w')->nullable();
            $table->string('linea')->nullable();
            $table->string('categoria')->nullable();
            $table->string('sub_categoria')->nullable();
            $table->string('permiso_sanitario')->nullable();
            $table->string('cpe')->nullable();
            $table->string('num_referencia_empaque')->nullable();
            $table->string('u_m_unit')->nullable();
            $table->string('codigo_de_barras_unit')->nullable();
            $table->string('u_m_inner_1')->nullable();
            $table->string('codigo_de_barras_inner_1')->nullable();
            $table->string('u_m_inner_2')->nullable();
            $table->string('codigo_barra_inner_2')->nullable();
            $table->string('u_m_outer')->nullable();
            $table->string('codigo_de_barras_outer')->nullable();
            $table->string('codigo_interno_asignado')->nullable();
            $table->string('descripcion_asignada_sistema')->nullable();
            
            // $table->softDeletes();
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
