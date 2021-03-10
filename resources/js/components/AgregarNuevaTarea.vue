<template>
    <button @click="formularioAgregar" class="btn btn-primary pull-right"> Añadir </button>

</template>

<script>
export default {
    data: () => 
    {
        return {
            
        }
    },
    methods: {

        formularioAgregar()
        {
            
            fetch('/usuarios')
                             .then(respuesta => respuesta.json())
                             .then( data => {
                                let usuario = []
                                for(let nombre of data )
                                {
                                    usuario.push(nombre.name)
                                } 
                                console.log(usuario)
                                this.$swal.fire({
                                   title: 'Multiple inputs',
                                   html: '<input id="swal-input1" class="swal2-input">' + '<input id="swal-input2" class="swal2-input">',
                                   focusConfirm: false,
                                   preConfirm: function preConfirm() {
                                  return [document.getElementById('swal-input1').value, document.getElementById('swal-input2').value]; }
                                   }).then(function (respuesta) {
                                     return console.log('desde aceptar');
                                   });
                                
                             })
                             .catch(error => console.log(error))
            

     
        }
    },
}
</script>