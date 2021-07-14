import React from "react";

const ProviderStatus = ({ provider, selectedProvider }) => {
    const isSelected = selectedProvider === provider;
    const enNegociacion = provider.pivot.iniciar_negociacion;

    return (
        <div className="d-flex justify-content-center align-items-center">
            {selectedProvider ? (
                isSelected ? (
                    <React.Fragment>
                        <span className="material-icons">done</span>
                        <span className="material-icons mr-2">done</span>
                        <strong className="h4 m-0">
                            Esta empresa fue escogida para continuar con
                            producción y arte
                        </strong>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <span className="material-icons mr-2">close</span>
                        <strong className="h4 m-0">
                            Esta empresa fue descartada
                        </strong>
                    </React.Fragment>
                )
            ) : (
                enNegociacion && (
                    <React.Fragment>
                        <span className="material-icons mr-2">done</span>
                        <strong className="h4 m-0">
                            Se ha inciado una negociacion con esta empresa
                        </strong>
                    </React.Fragment>
                )
            )}
        </div>
    );
};

export default ProviderStatus;
