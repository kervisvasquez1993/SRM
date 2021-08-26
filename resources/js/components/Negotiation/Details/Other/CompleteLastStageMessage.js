import React from "react";
import SmallWarningIcon from "../../../Widgets/Icons/SmallWarningIcon";

const CompleteLastStageMessage = () => {
    return (
        <div className="d-flex align-items-center justify-content-center py-4">
            <SmallWarningIcon />
            <p className="m-0">Esta etapa solo es visible al completar la anterior</p>
        </div>
    );
};

export default CompleteLastStageMessage;
