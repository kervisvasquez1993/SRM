import axios from "axios";
import fileDownload from "js-file-download";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useUser } from "../utils";
import { Channel } from "../utils/Echo";
import { apiURL } from "./App";

export const startDownloadingFile = async (id, data) => {
    const response = await data();

    // Esconder un mensaje en caso de que se encuentra
    toast.dismiss(id);

    // Mostrar mensaje
    toast.info("El archivo se está procesando. Esto puede llevar tiempo...", {
        hideProgressBar: true,
        autoClose: false,
        toastId: id,
        draggable: false,
        closeButton: false,
        closeOnClick: false
    });

    console.log(response);
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

                // fileDownload(e.archivo, "Productos.xlsx");

                // Crear una peticion http
                const xhr = new XMLHttpRequest();
                xhr.open("GET", e.archivo);
                xhr.responseType = "blob";

                // Event listener para el progreso de la descarga
                xhr.onprogress = event => {
                    // Calcular el progreso
                    const progress = event.loaded / event.total;

                    if (progress < 100) {
                        // Mostrar mensaje
                        toast.update(e.id, {
                            hideProgressBar: false,
                            progress: progress
                        });
                    }
                };

                xhr.onload = event => {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            // Descargar el archivo
                            fileDownload(xhr.response, "comparacion.xlsx");

                            // Mostrar mensaje
                            toast.update(e.id, {
                                render: "¡Su archivo está listo!",
                                type: toast.TYPE.SUCCESS,
                                autoClose: 2000,
                                hideProgressBar: true,
                                pauseOnFocusLoss: false,
                                closeButton: null,
                                closeOnClick: true,
                                progress: 0
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

                console.log(e);
            });
        }
    }, [user]);

    return null;
};
