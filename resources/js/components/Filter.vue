<template>
    <div>
            <div class="form-check" v-for="(user, index) in users">
                    <input class="form-check-input" type="checkbox" :value="user.id" :id="'user'+index" v-model="selected.user">
                    <label class="form-check-label" :for="'category' + index">
                        {{ user.name }} 
                    </label>
            </div>
        <hr>
             <div class="form-check" v-for="(user, index) in proveedores">
                    <input class="form-check-input" type="checkbox" :value="user.id" :id="'user'+index" v-model="selected.user">
                    <label class="form-check-label" :for="'category' + index">
                        {{ user.nombre }} {{user.products_count}}
                    </label>
            </div>

            
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            proveedores : [],
            users : [],
            filters : [],

            produccionTransitos : [],
            pivotTareaProveedor : [],

            loading : true,
            selected : {
                proveedores : [],
                users : [],
                filters : [],
              /*   produccionTransitos : [],
                pivotTareaProveedor : [], */
            }
        }
    },
    mounted()
    {
        this.loadProveedor();
        this.loadUser();
        this.loadFilter();
        
    },
    watch: {
        selected : function() 
        {
            this.loadProveedor();
            this.loadUser();
            this.loadFilter();
            /* this.loadProduccionTransito(); */
        }, deep: true
    }, methods: {
        loadProveedor: function()
        {
            axios.get('/api/proveedor',
            {
               params : _.omit(this.selected, 'proveedores')
            })
            .then((response) => {
                this.proveedores = response.data
            })
            .catch( function(error) {
                console.log(error)
            });
        },
        loadFilter : function(){
            axios.get('/api/filter', {
                params : this.selected
            }).
            then((response) => {
                console.log(response.data)
            })
            .catch(function(error) {
                console.log(error)
            })
        },
        loadUser : function(){
            axios.get('/api/users',
            {
                params : _.omit(this.selected, 'users')
            }).
            then( (response) => {
                this.users = response.data
                this.loading = false
            })
        },
       
    }
}
</script>