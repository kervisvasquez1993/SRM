import axios from "axios";
import fileDownload from "js-file-download";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useUser } from "../utils";
import { Channel } from "../utils/Echo";

export const startDownloadingFile = async data => {
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
            Channel.listen("RespuestaArchivo", e => {
                // Mostrar mensaje
                toast.update(e.id, {
                    render: "La descarga ha comenzado..."
                });

                console.log("Url de archivo recibido", e);

                // fileDownload(e.archivo, "Productos.xlsx");

                // Crear una peticion http
                const xhr = new XMLHttpRequest();
                xhr.open("GET", e.archivo);
                xhr.responseType = "blob";

                // Event listener para el progreso de la descarga
                xhr.onprogress = event => {
                    // Calcular el progreso
                    const progress = event.loaded / event.total;

                    if (progress < 99) {
                        // Mostrar mensaje
                        toast.update(e.id, {
                            hideProgressBar: false,
                            progress: progress
                        });
                    }
                };

                xhr.onload = event => {
                    if (xhr.readyState == 4) {
                        toast.dismiss(e.id);

                        if (xhr.status == 200) {
                            // Descargar el archivo
                            fileDownload(xhr.response, "comparacion.xlsx");

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
                // toast.update(e.id, {
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
                console.log(e.operacion_id);

                toast.update(e.operacion_id, {
                    hideProgressBar: false,
                    progress: e.progreso
                });
            });
        }
    }, [user]);

    return null;
};
