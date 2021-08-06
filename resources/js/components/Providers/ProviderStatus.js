import React from "react";

const ProviderStatus = ({ provider, selectedProvider }) => {
    const isSelected = selectedProvider === provider;

    if (!selectedProvider) {
        return null;
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            {isSelected ? (
                <React.Fragment>
                    <span className="material-icons">done</span>
                    <span className="material-icons mr-2">done</span>
                    <strong className="h4 m-0">
                        Esta empresa fue escogida para continuar con producción
                        y arte
                    </strong>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <span className="material-icons mr-2">close</span>
                    <strong className="h4 m-0">
                        Esta empresa fue descartada
                    </strong>
                </React.Fragment>
            )}
        </div>
    );
};

export default ProviderStatus;
