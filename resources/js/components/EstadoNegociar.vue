<template>
    <span class=""
         @click="cambiarEstado"
         :key="EstadoNegociar"
         :class="claseEstadoVacante()"
    >
                    {{estadoVacante}}
    </span>
</template>
<script>
export default {
    props : ['estado', 'vacanteId'],
    mounted() 
    {
        this.EstadoNegociar = Number(this.estado)
    },
    data : function()
    {
        return {
            EstadoNegociar : null
        }
    },
    methods: {
       
        claseEstadoVacante() {
            return this.EstadoNegociar === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        },
        cambiarEstado() {
            if(this.EstadoNegociar === 1) {
                this.EstadoNegociar = 0;
            } else {
                this.EstadoNegociar = 1;
            }

            // Enviar a axios
           const params = {
               estado : this.EstadoNegociar
           }

            axios.post('/vacantes/' + this.vacanteId, params)
            .then( respuesta => console.log(respuesta))
            .catch(error => console.log(error))
        }      
    },
    computed : 
    {
        estadoVacante()
        {
            return this.EstadoNegociar ===  1 ? 'Activa' : 'Inactiva'
        }
    }
}
</script>