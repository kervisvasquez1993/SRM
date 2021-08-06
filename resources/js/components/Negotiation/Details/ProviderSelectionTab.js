import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StageCompletedMessage from "./Other/StageCompletedMessage";
import CompleteLastStageMessage from "./Other/CompleteLastStageMessage";

const ProviderSelectionTab = () => {
    // @ts-ignore
    const negotiation = useSelector(state => state.negotiation.negotiation);

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
