import { useEffect } from "react";
import { toast } from "react-toastify";
import { useUser } from "../utils";
import { Channel } from "../utils/Echo";

export const startImportingFile = async data => {
    const response = await data();

    const id = response.data.data.id_operacion;

    console.log("Importando archivo", response.data.data);

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
            Channel.listen("ExitoSubiendoArchivoEvent", e => {
                toast.dismiss(e.id);
            });

            Channel.listen("ErrorSubiendoArchivoEvent", e => {
                toast.dismiss(e.id);
            });
        }
    }, [user]);

    return null;
};
