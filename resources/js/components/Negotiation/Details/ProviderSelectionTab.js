import React from "react";
import StageCompletedMessage from "./Other/StageCompletedMessage";
import CompleteLastStageMessage from "./Other/CompleteLastStageMessage";
import { useSelector } from "react-redux";

const ProviderSelectionTab = () => {
    // @ts-ignore
    const negotiation = useSelector(state => state.negotiation.negotiation);
    // @ts-ignore
    const user = useSelector(state => state.auth.user);

    if (user.rol === "logistica") {
        return (
            <div className="d-flex align-items-center justify-content-center">
                <span className="material-icons mr-2 text-danger">warning</span>
                <p className="m-0">
                    Los coordinadores están a cargo de completar esta etapa
                </p>
            </div>
        );
    }

    if (!negotiation.productos_confirmados && !negotiation.seleccionado) {
        return <CompleteLastStageMessage />;
    }

    return (
        <div className="d-flex flex-column align-items-center">
            {negotiation.seleccionado ? (
                <StageCompletedMessage />
            ) : (
                <div className="d-flex align-items-center py-4">
                    <span className="material-icons mr-2 text-danger">
                        warning
                    </span>
                    <p className="m-0">
                        Los coordinadores son los encargados de seleccionar al
                        proveedor mediante la paginá "Negociaciones"
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProviderSelectionTab;
