<template>
    <button @click="formularioAgregar" class="btn btn-primary pull-right">Agregar Nueva Tarea</button>
</template>

<script>
export default {
    methods: {
        formularioAgregar()
        {
            console.log('desde el componente de vue')
        }
    },
}
</script>