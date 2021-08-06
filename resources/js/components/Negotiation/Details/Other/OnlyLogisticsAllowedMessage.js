import React from "react";

const OnlyLogisticsAllowedMessage = () => {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <span className="material-icons mr-2 text-danger">warning</span>
            <p className="m-0">
                Los de logística son los encargados de completar esta etapa
            </p>
        </div>
    );
};

export default OnlyLogisticsAllowedMessage;
