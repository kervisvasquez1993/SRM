import React from "react";

const CompleteLastStageMessage = () => {
    return (
        <div className="d-flex align-items-center justify-content-center py-4">
            <span className="material-icons mr-2 text-danger">warning</span>
            <p className="m-0">Esta etapa solo es visible al completar la anterior</p>
        </div>
    );
};

export default CompleteLastStageMessage;
