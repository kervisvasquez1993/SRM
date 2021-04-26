<template>
    <div class="d-flex flex-column">
        <h5><strong>cbm totales por unidad</strong>: {{cbm_unit_total}}</h5>
        <h5><strong>ctn totales</strong>: {{total_cbm_final}}</h5>
        <h5><strong>total cbm</strong>: {{total_cbm_final}}</h5>
        <h5><strong>total n.w</strong>: {{total_n_w_resulta}}  </h5>
        <h5><strong>total g.w</strong>:  {{total_g_w_resulta}}</h5>           
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