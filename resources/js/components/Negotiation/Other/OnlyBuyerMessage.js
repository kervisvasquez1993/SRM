import React from "react";

const OnlyBuyerAllowedMessage = () => {
    return (
        <div className="d-flex align-items-center">
            <span className="material-icons mr-2 text-danger">warning</span>
            <p className="m-0">Solo el comprador asignado a esta tarea puede completar esta etapa</p>
        </div>
    );
};

export default OnlyBuyerAllowedMessage;