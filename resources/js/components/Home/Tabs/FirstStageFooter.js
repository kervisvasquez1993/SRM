import React from "react";
import FooterMessage from "../../Widgets/Modal/FooterMessage";

const FirstStageFooter = ({ task }) => {
    const { column } = task;
    let isEligible = true;
    let message = "¡Esta tarea puede pasar a la siguiente etapa!";

    if (column === 0 && !task.tiene_negociaciones) {
        isEligible = false;
        message =
            "Esta tarea necesita iniciar una negociación para pasar a la etapa 2";
    } else if (column === 1 && !task.arte_iniciada) {
        isEligible = false;
        message =
            "Esta tarea necesita iniciar arte para poder pasar a la etapa 3 o iniciar producción para poder pasar a la etapa 4";
    } else if (column === 2 && !task.produccion_iniciada) {
        isEligible = false;
        message =
            "Esta tarea necesita iniciar producción para poder pasar a la etapa 4";
    } else if (
        column === 3 &&
        task.produccion_iniciada &&
        !task.produccion_iniciada.recepcion_reclamo_devolucion
    ) {
        isEligible = false;
        message =
            "Esta producción debe salir del puerto origen para que la tarea pueda pasar a la etapa 4";
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
