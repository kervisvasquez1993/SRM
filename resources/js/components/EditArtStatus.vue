<template>
    <div @click="editStatus">
        <h1>DESDE VUE</h1>
    </div>
</template>

<script>
export default {
    methods: {
        editStatus() {
            console.log('EDITAR');
        }
    },
}
</script>