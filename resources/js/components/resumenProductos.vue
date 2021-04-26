<template>
    <div class="">
       
             
             <div class="card">
  
                <div class="card-header d-flex justify-content-around flex-wrap">
                    <h4><strong>Nombre</strong>: {{  }}</h4>
                    <h4><strong>Marca</strong>: {{  }}</h4>
                    <h4><strong>Código</strong>: {{  }}</h4>
                    <h4><strong>Código HS</strong>: {{  }}</h4>

                </div>

                <div class="card-body">
                    <div class="d-flex flex-wrap">
                        <p><strong>Descripción</strong>: {{  }}</p>
                    </div>

                    <div class="d-flex flex-column justify-content-between flex-sm-row">

                        <div class="d-flex flex-column">
                            <h5><strong>cbm totales por unidad</strong>: {{cbm_unit_total}}</h5>
                            <h5><strong>ctn totales</strong>: {{total_cbm_final}}</h5>
                            <h5><strong>total cbm</strong>: {{total_cbm_final}}</h5>
                            <h5><strong>total n.w</strong>: {{total_n_w_resulta}}  </h5>
                            <h5><strong>total g.w</strong>:  {{total_g_w_resulta}}</h5>
                        </div>

                        <div class="d-flex flex-column">
                            <h5><strong>Alto Carton (cm)</strong>: {{  }}</h5>
                            <h5><strong>Ancho Carton (cm)</strong>: {{  }}</h5>
                            <h5><strong>CBM</strong>: {{  }}</h5>
                            <h5><strong>Peso Neto (kg)</strong>: {{  }}</h5>
                            <h5><strong>Peso Bruto (kg)</strong>: {{  }}</h5>
                        </div>

                        <div class="d-flex flex-column">
                            <h5><strong>Total CBM</strong>: {{  }}</h5>
                            <h5><strong>Total Peso Neto (kg)</strong>: {{  }}</h5>
                            <h5><strong>Total Peso Bruto (kg)</strong>: {{  }}</h5>
                            <h5><strong>Total CTN</strong>: {{  }}</h5>
                            <h5><strong>Corregido Total PCS</strong>: {{  }}</h5>
                        </div>

                    </div>
                </div>

                <div class="d-flex justify-content-end">
                 
                       <span class="material-icons">
                         edit
                       </span>
                       <span class="text-primary">
                       </span>
                     </a>
                 </div>
            </div>
    
    </div>

    
</template>
<script>
export default {
    props : [
        'cbm',
        'ctn',
        'total_cbm',
        'total_n_w',
        'total_g_w'

    ],
   
    methods : 
    {
        totalResultado(argument)
        {
            const cbmNumber = argument.map( element =>
            { 
                element = element.replace(',', '.');
                let  elementNumber = parseFloat(element);
                return elementNumber               
            }) 
            let resultado = cbmNumber.reduce((total, cantidad) => total + cantidad);
            return resultado.toFixed(3);
        }
    },
    computed : 
    {
        
        cbm_unit_total : function()
        {
         return this.totalResultado(this.cbm)
        },
        ctn_total : function()
        {
            return this.totalResultado(this.ctn)
        },
        total_cbm_final : function()
        {
            return this.totalResultado(this.total_cbm)
        },
        
        total_n_w_resulta : function()
        {
           return this.totalResultado(this.total_n_w) 
        },
        total_g_w_resulta : function()
        {
            return this.totalResultado(this.total_g_w)
        }
        
    }
    
}
</script>