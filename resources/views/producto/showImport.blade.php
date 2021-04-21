@extends('admin.dashboar')

@section('css')

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.7.6/dropzone.min.css" integrity="sha512-jU/7UFiaW5UBGODEopEqnbIAHOI8fO6T99m7Tsmqs2gkdujByJfkCbbfPSN4Wlqlb9TGnsuC0YgUgWkRBK7B9A==" crossorigin="anonymous" />
    
    <style>
        .dropzone {
            border: 2px dashed #C1C1C1;  
            display: flex;
            justify-content: center; 
        }
        .dropzone .dz-message .dz-button {
                color: #666;
        }

        .dropzone .dz-preview .dz-progress {
            background: none;
        }

        .dropzone .dz-error {
                display: none;
        }

        .notes {
            margin-top: 20px;
        }

    </style>
@endsection

@section('content')


<form 
action="{{route('importProduct', ['id' => $producto ])}}" 
method="post" enctype="multipart/form-data"  
class="m-2 @error('file') is-invalid @enderror"
>
@csrf
<input type="hidden" name="id_proveedor" value="{{$producto}}">
<input type="file" name="file" class="">
<button class="btn btn-outline-primary ml-3">Importar</button>
@error('file')
    <span class="invalid-feedback d-block" role="alert">
        <strong> {{__('Abjunte un archivo CSV')}}</strong>
    </span>
@enderror

</form>
    <div class="container">
        <div class="mb-5">
            <h5>
                <i class="fas fa-file-upload"></i>
                Seleccione un arhivo <i>csv</i> para importar productos
            </h5>    
            <hr>
        </div>
        <form 

            enctype="multipart/form-data"  
            class="m-2 @error('file') is-invalid @enderror"
        >
            @csrf
    

            @error('file')
                <span class="invalid-feedback d-block" role="alert">
                    <strong> {{__('Abjunte un archivo CSV')}}</strong>
                </span>
            @enderror
            <input type="hidden" id="id_proveedor" name="id_proveedor" value="{{$producto}}">
            <div id="dropzone" class="dropzone rounded bg-gray-100">
            
            </div>

            <p id="error" class="text-danger"></p>
    
        </form>

        <div class="text-center">
            <button id="importFile" class="btn btn-outline-primary ml-3">
                <i class="fas fa-upload"></i>
                Importar
            </button>

        </div>

        <div class="notes">
            <strong>Recuerde</strong>: 
            
            <ul>
                <li>El archivo debe tener extensión <strong>csv</strong>.</li>
                <li>Sólo puede subir un archivo por vez.</li>
                <li>El archivo debe tener el formato acordado.</li>
                <li>Si un producto en el archivo ya existe en el sistema, éste sera actualizado con la información del archivo.</li>
            </ul>
        </div>

    </div>
    @if(session('successTo'))
    <div class="toast-parent">
      <div id="toast" class="success-toast fade-in fade-out alert alert-success alert-dismissible fade show" role="alert">
        <i class="fas fa-check-circle"></i>
        {{ session('successTo') }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

    </div>

  @endif
@endsection

@section('scripts')
    
    <script 
        src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.7.6/dropzone.min.js" 
        integrity="sha512-s9Ud0IV97Ilh2e46hhMIez0TyGyBrBcHS+6duvJnmAxyIBwinHEVYKLLWIwmQi3lsQPA7CL+YMtOAFgeVNt6+w==" 
        crossorigin="anonymous"
    >
    </script>

    <script>
        let id_proveedor = document.getElementById('id_proveedor').value
        Dropzone.autoDiscover = false;

        document.addEventListener('DOMContentLoaded', function() {
            
            // Dropzone
            const dropzoneDevJobs = new Dropzone('#dropzone', {
                url: `/importProduct/${id_proveedor}`,
                dictDefaultMessage: 'Sube aqui el archivo',
                acceptedFiles: '.csv',
                addRemoveLinks: true,
                dictRemoveFile: 'Quitar',
                maxFiles: 1,
                autoProcessQueue: false,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]').content
                }, 
                success: ( file, response ) => {
                    document.querySelector('#error').textContent = '';
                    console.log(response)
                },
                error: ( file, response ) => {

                    document.querySelector('#error').textContent = 'Ha ocurrido un error. Por favor verifique el formato y estructura del archivo.'
                    console.log(response)
                    console.log(this.url)
                },
                maxfilesexceeded: function(file) {
    
                    if ( this.files[1] != null) {
                        // Si se sube mas de un archivo, se elimina el anterior
                        this.removeFile(this.files[0]);
                        // add the new file
                        this.addFile( file );
                    }
                },
                // removedfile: function( file, response ) {
                //     document.querySelector('#error').textContent = '';
                // },
                init: function() {
                    let button = document.querySelector('#importFile');

                    myDropzone = this;

                    button.addEventListener('click', function(e) {
                        
                        e.preventDefault();
                        myDropzone.processQueue();
                    });

                    myDropzone.on("complete", function(file) {

            

                        if ( file.status === 'success' ) {
                            let alert = document.createElement('div');
                            alert.classList.add('alert', 'alert-success');
                            alert.setAttribute('role', 'alert');
                            alert.textContent = 'El archivo ha sido importado exitosamente';
                            alert.style.position = 'absolute';
    
                            let icon = document.createElement('i');
                            icon.classList.add('fas', 'fa-check-circle');
                            icon.style.marginLeft = '5px';
                            alert.appendChild(icon);
    
                            let el = document.getElementById('dropzone');
                            el.appendChild(alert);
    
                            setTimeout(() => {
                                alert.style.display = 'none';
                            }, 2000);

                        }
                        

                        myDropzone.removeFile(file);
                    });
                }
            });

            
            
        });
    </script>

@endsection
