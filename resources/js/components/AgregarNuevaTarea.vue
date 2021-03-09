<template>
    <button @click="formularioAgregar" class="btn btn-primary pull-right">Agregar Nueva Tareas</button>
</template>

<script>
export default {
    methods: {
        formularioAgregar()
        {
            this.$swal.fire({
             title: 'Multiple inputs',
             html:
                    '<input id="swal-input1" class="swal2-input">' +
                    '<input id="swal-input2" class="swal2-input">',
             focusConfirm: false,
            preConfirm: () => {
              return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value
              ]
            }
         }).then(respuesta => console.log('desde aceptar'))

     
        }
    },
}
</script>