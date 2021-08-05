import React from "react";

const OnlyBuyersAllowedMessage = () => {
    return (
        <div className="d-flex align-items-center">
            <span className="material-icons mr-2 text-danger">warning</span>
            <p className="m-0">
                El comprador asignado a esta tarea es el encargado de completar
                esta etapa
            </p>
        </div>
    );
};

export default OnlyBuyersAllowedMessage;
