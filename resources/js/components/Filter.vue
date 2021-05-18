<template>
     <div class="testtt" :class="{'loading': loading}">
         <div class="row">
            <div class="col-lg-3 mb-4">
                <h5>user</h5>
                <div class="form-check" v-for="(user, index) in users">
                        <input class="" type="checkbox" :value="user.id" :id="'user'+index" v-model="selected.users">
                        <label class="form-check-label" :for="'category' + index">
                            {{ user.name }} {{user.products_count}}
                        </label>
                </div>
                 <hr>
                 <h5>proveedores</h5>
                 <div class="form-check" v-for="(user, index) in proveedores">
                        <input class="" type="checkbox" :value="user.id" :id="'user'+index" v-model="selected.proveedores">
                        <label class="form-check-label" :for="'category' + index">
                            {{ user.nombre }} {{user.products_count}}
                        </label>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="row mt-4">
                    <div class="col-lg-4 col-md-6 mb-4" v-for="product in filters">
                        <div class="card h-100">
                            <div class="card-body">
                                <h4 class="card-title">
                                    <a href="#">{{ product }} </a>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>

            
    </div>
</template>

<script>
export default {


    data: function() 
    {
        return {
            proveedores : [],
            users : [],
            filters : [],
            loading : true,
            selected : 
            {
                proveedores : [],
                users : [],
                
            }
        }
    },
    mounted()
    {
        this.loadProveedor();
        this.loadUser();
        this.loadFilter();
        
    },
    watch: 
        {
            selected : 
            {
                handler : function()
                {
                   this.loadProveedor();
                   this.loadUser();
                   this.loadFilter();
                   /* this.loadProduccionTransito(); */
                }, 
                deep: true
            }
        },
        methods: 
        {
            loadProveedor: function()
            {
                axios.get('/api/proveedor',
                {
                   params : _.omit(this.selected, 'proveedores')
                })
                .then((response) => {
                    
                    this.proveedores = response.data.data;
                    console.log(this.proveedores)
                    this.loading = false;
    
                })
                .catch( function(error) {
                    console.log(error)
                });
            },
            loadUser : function()
            {
                axios.get('/api/users',
                {
                    params : _.omit(this.selected, 'users')
                }).
                then( (response) => {
                    this.users = response.data
                    this.loading = false
                })
            },
            loadFilter : function(){
                axios.get('/api/filter', {
                    params : this.selected
                }).
                then((response) => {
                    this.filters =  response.data 
                })
                .catch(function(error) {
                    console.log(error)
                })
            },
        }
}
</script>