@extends('admin.dashboar')

@section('content')
    <div class="d-flex justify-content-between">
       
       <div>
            <a
                class="btn btn-sm btn-outline-primary btn-round"
                type="button"
                href="{{ route('producto.showImport', ['proveedor_id' => $id_proveedor] ) }}"
            >
              <span class="material-icons mr-2 text-primary">
                add_circle_outline
              </span>
              <span class="text-primary">
                  Importar Productos
              </span>
            </a>
            <a
                class="btn btn-sm btn-outline-primary btn-round"
                type="button"
                href="{{ route('productos.create', ['id_proveedor' => $id_proveedor] ) }}"
            >
              <span class="material-icons mr-2 text-primary">
                add_circle_outline
              </span>
              <span class="text-primary">
                  Crear Producto
              </span>
            </a>
       </div>
       @include('ui.previous')
        
    </div>

    <h4><strong>Proveedor</strong>: {{ $proveedor->nombre }}</h4>
    
    <div id="accordion" role="tablist">


        @foreach( $proveedor->productos as $producto)
            <div class="card">
  
                <div class="card-header d-flex justify-content-around flex-wrap">
                    <h4><strong>Nombre</strong>: {{ $producto->product_name }}</h4>
                    <h4><strong>Marca</strong>: {{ $producto->brand }}</h4>
                    <h4><strong>Código</strong>: {{ $producto->product_code }}</h4>
                    <h4><strong>Código HS</strong>: {{ $producto->hs_code }}</h4>
                </div>

                <div class="card-body">
                    <div class="d-flex flex-wrap">
                        <p><strong>Descripción</strong>: {{ $producto->description }}</p>
                    </div>

                    <div class="d-flex flex-column justify-content-between flex-sm-row">

                        <div class="d-flex flex-column">
                            <h5><strong>Vida útil (meses)</strong>: {{ $producto->shelf_life }}</h5>
                            <h5><strong>Total de piezas</strong>: {{ $producto->total_pcs }}</h5>
                            <h5><strong>Piezas empaque unitario</strong>: {{ $producto->pcs_unit }}</h5>
                            <h5><strong>Piezas carton (cm)</strong>: {{ $producto->pcs_ctn }}</h5>
                            <h5><strong>Largo Carton (cm)</strong>: {{ $producto->ctn_packing_size_l }}</h5>
                        </div>

                        <div class="d-flex flex-column">
                            <h5><strong>Alto Carton (cm)</strong>: {{ $producto->ctn_packing_size_h }}</h5>
                            <h5><strong>Ancho Carton (cm)</strong>: {{ $producto->ctn_packing_size_w }}</h5>
                            <h5><strong>CBM</strong>: {{ $producto->cbm }}</h5>
                            <h5><strong>Peso Neto (kg)</strong>: {{ $producto->n_w_ctn }}</h5>
                            <h5><strong>Peso Bruto (kg)</strong>: {{ $producto->g_w_ctn }}</h5>
                        </div>

                        <div class="d-flex flex-column">
                            <h5><strong>Total CBM</strong>: {{ $producto->total_cbm }}</h5>
                            <h5><strong>Total Peso Neto (kg)</strong>: {{ $producto->total_n_w }}</h5>
                            <h5><strong>Total Peso Bruto (kg)</strong>: {{ $producto->total_g_w }}</h5>
                            <h5><strong>Total CTN</strong>: {{ $producto->total_ctn }}</h5>
                            <h5><strong>Corregido Total PCS</strong>: {{ $producto->corregido_total_pcs }}</h5>
                        </div>

                    </div>
                </div>

                <div class="d-flex justify-content-end">
                    <a
                         class="btn btn-outline-primary btn-fab btn-fab-mini btn-round mr-2 mb-2"
                         type="button"
                         href="{{ route('productos.edit', ['producto' => $producto->id ] )  }}" 
                     >
                       <span class="material-icons">
                         edit
                       </span>
                       <span class="text-primary">
                       </span>
                     </a>
                 </div>
            </div>
            
        @endforeach

    </div>
      

@endsection