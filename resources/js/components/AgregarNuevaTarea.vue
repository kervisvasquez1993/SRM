<template>
    <button @click="formularioAgregar" class="btn btn-primary pull-right"> Añadir </button>

</template>

<script>
import axios from 'axios'
export default {
  
    methods: {

        formularioAgregar()
        {
            
            axios.get('/usuarios')
                                 .then(respuesta => respuesta.json())
                                 .then( data =>console.log(data) )
                                 .catch(error => console.log(error))
            

     
        }
    },
}
</script>