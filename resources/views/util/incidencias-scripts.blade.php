<script>

    // Set the Incidencia id using a data attribute
    function setIncidenciaAttribute( incidencia ) {
        const modal = document.getElementById('deleteModal');
        modal.setAttribute('data-incidencia', incidencia.id);
    }

    // Guardar para crear una incidencia
    function guardarIncidencia( arte, url ) {

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
                                        <span id="icon-delete-${ resp.data.incidencia.id }" class="material-icons pointer" data-toggle="modal" data-target="#deleteModal">
                                            delete_forever
                                        </span>
                                    </td>
                        `;

                        // Insert the new element to the DOM
                        tbody.appendChild(tr);

                        document.getElementById(`icon-delete-${ resp.data.incidencia.id }`).onclick = function() { setIncidenciaAttribute( resp.data.incidencia );  }                        

                    } else {
                        location.reload();
                    }

                    // Reset inputs
                    document.getElementById('titulo').value = '';
                    document.getElementById('descripcion').value = '';

                    // show toast message
                    showToast('Incidencia creada exitosamente', 'check_circle_outline', 'success');


                }

            });

        }
    }

    // Eliminar una incidencia
    function elimiarIncidencia( url ) {

        const modal = document.getElementById('deleteModal');
        const bocetoId = modal.dataset.incidencia;

        axios.post(`${ url }/${ bocetoId }`, 
        { 
            bocetoId ,  
            _method: 'delete' 
        }).then(resp => { 
            
            if ( resp.status === 200 ) {
                const tbody = document.getElementById('tbody');
                const tr = document.getElementById(bocetoId);
                // Delete from DOM
                tbody.removeChild(tr);

                // Hide Modal
                $(`#deleteModal`).modal('hide')

                // When the table is emptied
                const childTrs = tbody.childNodes;
                if ( childTrs.length < 1 ) {
                    location.reload();
                }

                showToast('La incidencia ha sido eliminada', 'check_circle_outline', 'warning');

            }


        });
    }

    // Show a toast message
    function showToast(message, icon, alertClass) {
        
        const alert = document.createElement('div');
        alert.classList.add('alert');
        alert.classList.add(`alert-${ alertClass }`);
        alert.classList.add('alert-dismissible');
        alert.classList.add('fade');
        alert.classList.add('show');
        alert.classList.add('d-flex');
        alert.classList.add('flex-row');
        alert.style.margin = '10px';
        alert.style.position = 'absolute';
        alert.style.top = '85vh';
        alert.style.width = '90%';
        alert.setAttribute('role', 'alert');

        alert.innerHTML = `
        <span class="material-icons mr-2">
            ${ icon }
        </span>
        <span class="mt-1">${ message }</span>
        
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        `;

        // document.body.appendChild(alert);
        document.getElementsByClassName('content')[0].appendChild(alert);

        setTimeout(() => {
            document.getElementsByClassName('content')[0].removeChild(alert);
        }, 2500);
    }
    
 </script>
