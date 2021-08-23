import React from "react";
import SmallWarningIcon from "../../../Widgets/Icons/SmallWarningIcon";

const OnlyBuyersAllowedMessage = () => {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <SmallWarningIcon />
            <p className="m-0">
                El comprador asignado a esta tarea es el encargado de completar
                esta etapa
            </p>
        </div>
    );
};

export default OnlyBuyersAllowedMessage;
