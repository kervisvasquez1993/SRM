import React from "react";
import SmallWarningIcon from "../../../Widgets/Icons/SmallWarningIcon";

const OnlyLogisticsAllowedMessage = () => {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <SmallWarningIcon />
            <p className="m-0">
                Los de logística son los encargados de completar esta etapa
            </p>
        </div>
    );
};

export default OnlyLogisticsAllowedMessage;
