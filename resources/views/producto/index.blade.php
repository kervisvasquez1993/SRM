@extends('admin.dashboar')

@section('content')
    <div class="d-flex justify-content-end">
        <button
        class="btn btn-outline-primary btn-round"
        >
          <span class="material-icons mr-2">
            add_circle_outline
          </span>
          Crear Producto
        </button>
    </div>

    <h4><strong>Proveedor</strong>: Empresa Proveedor </h4>

    {{$productos}}

    <div id="accordion" role="tablist">

        @foreach($productos as $producto)
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

                    <div class="d-flex justify-content-around flex-wrap">
                        <h5><strong>Vida útil (meses)</strong>: {{ $producto->shelf_life }}</h5>
                        <h5><strong>Total de piezas</strong>: {{ $producto->total_pcs }}</h5>
                        <h5><strong>Piezas empaque unitario</strong>: {{ $producto->pcs_unit }}</h5>
                        <h5><strong>Piezas carton (cm)</strong>: {{ $producto->pcs_ctn }}</h5>
                        <h5><strong>Largo Carton (cm)</strong>: {{ $producto->ctn_packing_size_l }}</h5>
                        <h5><strong>Alto Carton (cm)</strong>: {{ $producto->ctn_packing_size_h }}</h5>
                        <h5><strong>Ancho Carton (cm)</strong>: {{ $producto->ctn_packing_size_w }}</h5>
                        <h5><strong>CBM</strong>: 32</h5>
                    </div>

                    <div class="d-flex justify-content-around flex-wrap">
                        <h5><strong>Peso Neto (kg)</strong>: 32</h5>
                        <h5><strong>Peso Bruto (kg)</strong>: 32</h5>
                        <h5><strong>Total CBM</strong>: 32</h5>
                        <h5><strong>Total Peso Neto</strong>: 32</h5>
                        <h5><strong>Total Peso Bruto</strong>: 32</h5>
                        <h5><strong>Total CTN</strong>: 32</h5>
                        <h5><strong>Corregido Total PCS</strong>: 32</h5>
                    </div>
                </div>

            </div>
            
        @endforeach

    </div>
      

@endsection