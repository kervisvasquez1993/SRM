import React from "react";
import FooterMessage from "../../Widgets/Modal/FooterMessage";

const FirstStageFooter = ({ task }) => {
    const { column } = task;

    // Esta informacion es necesaria para saber en que etapa se haya la tarea
    const tieneProductos = task.tiene_productos;
    const negociacion_seleccionada = task.negociacion_seleccionada;
    const arte = negociacion_seleccionada && negociacion_seleccionada.arte;

    const produccion_transito =
        negociacion_seleccionada &&
        negociacion_seleccionada.produccion_transito;

    const recepcion_reclamo_devolucion =
        produccion_transito && produccion_transito.recepcion_reclamo_devolucion;

    let isEligible = true;
    let message = "¡Esta tarea puede pasar a la siguiente etapa!";

    if (column === 0 && !tieneProductos) {
        isEligible = false;
        message =
            "Se deben cargar productos en alguna de las empresas para pasar a la etapa 2";
    } else if (column === 1 && !arte) {
        isEligible = false;
        message =
            "Esta tarea necesita iniciar arte para poder pasar a la etapa 3 o iniciar producción para poder pasar a la etapa 4";
    } else if (column === 2 && !produccion_transito) {
        isEligible = false;
        message =
            "Esta tarea necesita iniciar producción para poder pasar a la etapa 4";
    } else if (column === 3 && !recepcion_reclamo_devolucion) {
        isEligible = false;
        message =
            "La producción de está tarea debe completar nacionalización para que la tarea pueda pasar a la etapa 4";
    }

    if (column === 4) {
        return null;
    }

    return (
        <FooterMessage background={isEligible ? "bg-success" : "bg-danger"}>
            {isEligible ? (
                <span className="material-icons mr-2">done</span>
            ) : (
                <span className="material-icons mr-2">warning</span>
            )}
            {message}
        </FooterMessage>
    );
};

export default FirstStageFooter;
