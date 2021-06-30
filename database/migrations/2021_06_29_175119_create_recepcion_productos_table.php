<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecepcionProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recepcion_productos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recepcion_reclamo_devolucion_id')->references('id')->on('recepcion_reclamo_devolucions');
            $table->string('codigo_sistema')->nullable();
            $table->text('descripcion')->nullable();
            $table->string('lote')->nullable();
            $table->date('vence')->nullable();
            $table->double('total_recibido_en_unidades')->nullable();
            $table->string('u_m')->nullable();
            $table->double('cantidad_u_m')->nullable();
            $table->double('total_unidades_bulto')->nullable();
            $table->double('cantidad_empaque_intermedio')->nullable();
            $table->double('u_m_empaque_intermedio')->nullable();
            $table->double('unidades_en_bulto_resto')->nullable();
            $table->string('presentacion')->nullable();
            $table->string('referencia_catalogo')->nullable();
            $table->string('packing_u_m')->nullable();
            $table->double('packing_cantidad_u_m')->nullable();
            $table->double('packing_unidades_u_m')->nullable();
            $table->double('packing_total_unidad_spl')->nullable();
            $table->boolean('validacion')->defaul('false');
            $table->string('observaciones')->nullable();
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
        Schema::dropIfExists('recepcion_productos');
    }
}
