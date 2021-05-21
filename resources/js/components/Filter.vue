<template>
     <div class="testtt" :class="{'loading': loading}">
         <div class="row">
            <div class="col-lg-2 mb-2">
                <h5>Usuarios</h5>
                <div class="form-check" v-for="(user, index) in users">
                        <input class="" type="checkbox" :value="user.id" :id="'user'+index" v-model="selected.users">
                        <label class="form-check-label" :for="'category' + index">
                            {{ user.name }}
                        </label>
                </div>
                 <hr>
                 <h5>Pais</h5>
                 
                 <div class="form-check" v-for="(proveedor, index) in proveedores">
                        <input class="" type="checkbox" :value="proveedor.code_unit" :id="'user'+index" v-model="selected.proveedores">
                        <label class="form-check-label" :for="'category' + index">
                            {{proveedor.pais}}
                        </label>
                </div>
            </div>
            <div class="col-lg-10">
                <div class="row mt-4">
                    <div class="col-lg-4 col-md-6 col-sm-12" v-for="product in filters">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="d-flex align-items-center">
                                   <a><strong>Empresa</strong></a>:
                                        {{product.proveedor.nombre}}
                                </h5>
                                 <h5 class="d-flex align-items-center">
                                   <a><strong>País</strong></a>:
                                        {{product.proveedor.pais}}
                                </h5>
                                 <h5 class="d-flex align-items-center">
                                   <a><strong>Ciudad</strong></a>:
                                        {{product.proveedor.ciudad}}
                                </h5>
                                <h5 class="d-flex align-items-center">
                                   <a><strong>Distrito</strong></a>:
                                        
                                </h5>
                         
                                <h5 class="d-flex align-items-center">
                                   <a v-bind:href="'/pago-anticipado?produccionTransitoId='+product.produccion_transitos_id"><strong>Pago Anticipado</strong></a>:
                                        <div v-if="product.produccion_transito.pagos_anticipados">
                                            <span class="material-icons text-success">
                                             done_all
                                            </span>  
                                        </div>
                                        <div v-else>
                                            <span class="material-icons text-danger">
                                              clear
                                            </span>
                                        </div>
                                </h5>
                                  <h5 class="d-flex align-items-center">
                                   <a v-bind:href="'/pago-balance?produccionTransitoId='+product.produccion_transitos_id"><strong>Pago Balance</strong></a>:
                                        <div v-if="product.produccion_transito.pago_balance">
                                            <span class="material-icons text-success">
                                             done_all
                                            </span>  
                                        </div>
                                        <div v-else>
                                            <span class="material-icons text-danger">
                                              clear
                                            </span>
                                        </div>
                                </h5>
                                <h5 class="d-flex align-items-center">
                                   <a v-bind:href="'/inicio-produccion?produccionTransitoId='+product.produccion_transitos_id"><strong>Inicio Produccion</strong></a>:
                                        <div v-if="product.produccion_transito.inicio_produccion">
                                            <span class="material-icons text-success">
                                             done_all
                                            </span>  
                                        </div>
                                        <div v-else>
                                            <span class="material-icons text-danger">
                                              clear
                                            </span>
                                        </div>
                                </h5>
                                <h5 class="d-flex align-items-center">
                                   <a v-bind:href="'fin-produccion?produccionTransitoId='+product.produccion_transitos_id"><strong>Fin Produccion</strong></a>:
                                        <div v-if="product.produccion_transito.fin_produccion">
                                            <span class="material-icons text-success">
                                             done_all
                                            </span>  
                                        </div>
                                        <div v-else>
                                            <span class="material-icons text-danger">
                                              clear
                                            </span>
                                        </div>
                                </h5>
                                <h5 class="d-flex align-items-center">
                                   <a v-bind:href="'/transito-nacionalizacion?produccionTransitoId='+product.produccion_transitos_id"><strong>Transito Nacionalización</strong></a>:
                                        <div v-if="product.produccion_transito.transito_nacionalizacion">
                                            <span class="material-icons text-success">
                                             done_all
                                            </span>  
                                        </div>
                                        <div v-else>
                                            <span class="material-icons text-danger">
                                              clear
                                            </span>
                                        </div>
                                </h5>
                                <h5 class="d-flex align-items-center">
                                   <a v-bind:href="''+product.produccion_transitos_id"><strong>Salida Puero Origen</strong></a>:
                                        <div v-if="product.produccion_transito.salida_puero_origen">
                                            <span class="material-icons text-success">
                                             done_all
                                            </span>  
                                        </div>
                                        <div v-else>
                                            <span class="material-icons text-danger">
                                              clear
                                            </span>
                                        </div>
                                </h5>
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
                    
                    this.proveedores = []
                    let unit = response.data.data;
                    let result = [];
                    
                    unit.forEach(item => 
                    {
                        
                        if(!result.includes(item.code_unit))
                        {
                    		result.push(item.code_unit)
                            this.proveedores.push(item)
    	                }
                    });                  
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