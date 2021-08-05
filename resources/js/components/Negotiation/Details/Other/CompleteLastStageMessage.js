import React from "react";

const CompleteLastStageMessage = () => {
    return (
        <div className="d-flex align-items-center justify-content-center py-4">
            <span className="material-icons mr-2 text-danger">warning</span>
            <p className="m-0">Complete la etapa anterior para entrar a esta</p>
        </div>
    );
};

export default CompleteLastStageMessage;
