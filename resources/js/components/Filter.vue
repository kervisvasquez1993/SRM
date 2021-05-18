<template>
    <div>
        
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            proveedor : [],
            selected : {
                preoveedor : []
            }
        }
    },
    mounted()
    {
        this.loadProveedor();
    },
    watch: {
        selected : function() {
            this.loadProveedor();
        }, deep: true
    }, methods: {
        loadProveedor: function()
        {
            axios.get('/api/proveedor', {
               params : this.selected
            }).then(response => console.log(response.data))
        }
    }
}
</script>