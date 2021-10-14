import fileDownload from "js-file-download";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useUser } from "../utils";
import { Channel } from "../utils/Echo";

export const startExportingFile = async data => {
    const response = await data();

    const id = response.data.data.operacion_id;

    console.log("Procesando archivo", response.data.data);

    // Mostrar mensaje
    toast.info("El archivo se está procesando. Esto puede llevar tiempo...", {
        toastId: id,
        hideProgressBar: true,
        autoClose: false,
        draggable: false,
        closeButton: false,
        closeOnClick: false
    });
};

export default () => {
    const user = useUser();

    useEffect(() => {
        if (user) {
            Channel.listen("ExitoExportandoArchivoEvent", e => {
                // Mostrar mensaje
                toast.update(e.operacionId, {
                    render: "La descarga ha comenzado..."
                });

                console.log("Url de archivo recibido", e);

                // Crear una peticion http
                const xhr = new XMLHttpRequest();
                xhr.open("GET", e.archivoUrl);
                xhr.responseType = "blob";

                // Event listener para el progreso de la descarga
                xhr.onprogress = event => {
                    // Calcular el progreso
                    const progress = event.loaded / event.total;

                    if (progress < 99) {
                        // Mostrar mensaje
                        toast.update(e.operacionId, {
                            hideProgressBar: false,
                            progress: progress
                        });
                    }
                };

                xhr.onload = event => {
                    if (xhr.readyState == 4) {
                        toast.dismiss(e.operacionId);

                        if (xhr.status == 200) {
                            console.log(xhr);
                            // Descargar el archivo
                            fileDownload(xhr.response, e.archivoNombre);

                            // Mostrar mensaje
                            toast.success("¡Su archivo está listo!", {
                                autoClose: 2000,
                                hideProgressBar: true
                            });
                        }
                    }
                };

                // Enviar la solicitud para descargar
                xhr.send();

                // Mostrar mensaje
                // toast.update(e.operacionId, {
                //     render: "¡Su archivo está listo!",
                //     type: toast.TYPE.SUCCESS,
                //     autoClose: 2000,
                //     hideProgressBar: false,
                //     pauseOnFocusLoss: false,
                //     closeButton: null,
                //     closeOnClick: true
                // });
            });

            Channel.listen("ProgresoArchivoEvent", e => {
                // Mostrar mensaje
                console.log(`Progreso ${e.progreso}`);
                console.log(e);

                toast.update(e.operacion_id, {
                    hideProgressBar: false,
                    progress: e.progreso
                });
            });
        }
    }, [user]);

    return null;
};
