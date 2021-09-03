import axios from "axios";
import download from "downloadjs";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useUser } from "../utils";
import { Channel } from "../utils/Echo";
import { apiURL } from "./App";

export const startDownloadingFile = async (id, data) => {
    const response = await data();

    // Mostrar mensaje
    toast.info("El archivo se está procesando. Esto puede llevar tiempo...", {
        hideProgressBar: true,
        autoClose: false,
        toastId: id
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

                // Descargar el archivo
                download(e.archivo);

                // Mostrar mensaje
                toast.update(e.id, {
                    render: "¡Su archivo está listo!",
                    type: toast.TYPE.SUCCESS,
                    autoClose: 2000,
                    hideProgressBar: false,
                    pauseOnFocusLoss: false
                });

                console.log(e);
            });
        }
    }, [user]);

    return null;
};
