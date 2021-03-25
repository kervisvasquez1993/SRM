<script>

    // Set the Incidencia id using a data attribute
    function setIncidenciaAttribute( incidencia ) {
        console.log('SET ATTR')
        const modal = document.getElementById('deleteModal');
        modal.setAttribute('data-incidencia', incidencia.id);
    }

    // Guardar para crear una incidencia
    function guardarIncidencia( arte, url ) {
        console.log('URL recibido: ', url)

        const titulo = document.getElementById('titulo').value.trim();
        const descripcion = document.getElementById('descripcion').value.trim();

        if ( titulo !== '' && descripcion !== '' ) {
            const params = {
                titulo,
                descripcion,
                arte
            };
            
            axios.post( url, 
            { params }
            ).then( resp => {
                // Hide Modal
                $(`#CreateModal`).modal('hide')

                if ( resp.status === 200 ) {
                    const tbody = document.getElementById('tbody');

                    if ( tbody ) {
                        const tr = document.createElement('tr');
                        tr.id = resp.data.incidencia.id;
                        const date = new Date( resp.data.incidencia.updated_at );
                        const month = (date.getMonth() + 1 ) < 9 ? `0${ date.getMonth() + 1  }` : `${ date.getMonth() + 1  }`;

                        // Create the new row
                        tr.innerHTML = `
                                    <td class="">
                                        ${ resp.data.incidencia.id }
                                    </td>
                                    <td>
                                        ${ resp.data.incidencia.titulo }
                                    </td>
                                    <td>
                                        ${ resp.data.incidencia.descripcion }
                                    </td>
                                    <td class="">
                                        ${ resp.data.user.name }
                                    </td>
                                    <td class="">
                                        ${ date.getDate() }-${ month }-${ date.getFullYear() }
                                    </td>
                                    <td>
                                        <span id="icon-delete-${ resp.data.incidencia.id }" onclick="${ setIncidenciaAttribute( resp.data.incidencia )}" class="material-icons pointer" data-toggle="modal" data-target="#deleteModal">
                                            delete_forever
                                        </span>
                                    </td>
                        `;
                        // Insert the new element to the DOM
                        tbody.appendChild(tr);

                    } else {
                        location.reload();
                    }


                }

            });

        }
    }

    // Eliminar una incidencia
    function elimiarIncidencia( boceto, url ) {

        console.log('URL para borrar: ', url)
        const modal = document.getElementById('deleteModal')
        const bocetoId = modal.dataset.incidencia;

        axios.post(`${ url }/${ bocetoId }`, 
        { 
            bocetoId ,  
            _method: 'delete' 
        }).then(resp => { 
            
            if ( resp.status === 200 ) {
                const tbody = document.getElementById('tbody');
                const tr = document.getElementById(bocetoId);
                console.log(tr)
                tbody.removeChild(tr);

                // Hide Modal
                $(`#deleteModal`).modal('hide')

                
                const childTrs = tbody.childNodes;
                if ( childTrs.length <= 1 ) {
                    location.reload();
                }


            }


        });
    }
 </script>