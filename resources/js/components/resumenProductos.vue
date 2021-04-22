<template>
    <div>
       <h4>{{cbm_unit_total}} cbm totales por unidad</h4>
       <h4>{{ctn_total}} ctn totales</h4>
       <h4>{{total_cbm_final}} total cbm</h4>
       <h4>{{total_n_w_resulta}} total n.w </h4>
       <h4>{{total_g_w_resulta}} total g.w  </h4>
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