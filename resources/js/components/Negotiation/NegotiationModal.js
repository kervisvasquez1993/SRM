import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    startArtWithNegotiation,
    startProductionWithNegotiation
} from "../../store/actions/negotiationActions";
import NegotiationTabs from "./NegotiationTabs";

const NegotiationModal = ({ negotiation }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const isStarting = useSelector(state => state.negotiation.isStarting);

    const {
        id,
        iniciar_produccion,
        iniciar_arte,
        compra_po: poCode
    } = negotiation;

    const isProductListEmpty =
        negotiation.total_cbm == 0 &&
        negotiation.total_n_w == 0 &&
        negotiation.total_g_w == 0 &&
        negotiation.total_ctn == 0;

    const handleStartProduction = () => {
        dispatch(startProductionWithNegotiation(id));
    };

    const handleStartArt = () => {
        dispatch(startArtWithNegotiation(id));
    };

    const handleStartBoth = () => {
        handleStartArt();
        handleStartProduction();
    };

    return (
        <React.Fragment>
            <NegotiationTabs negotiation={negotiation} />

            {(iniciar_arte || iniciar_produccion) && (
                <div className="modal-footer bg-success flex-column align-items-start pl-4">
                    {iniciar_produccion && (
                        <p className="d-flex text-white align-items-center h6 pl-4">
                            <span className="material-icons mr-2">
                                check_circle
                            </span>
                            Producción iniciada
                        </p>
                    )}
                    {iniciar_arte && (
                        <p className="d-flex text-white align-items-center h6 pl-4">
                            <span className="material-icons mr-2">
                                check_circle
                            </span>
                            Arte iniciada
                        </p>
                    )}
                </div>
            )}

            {poCode ? (
                user.rol === "coordinador" &&
                (iniciar_arte === 0 || iniciar_produccion === 0) && (
                    <div className="modal-footer">
                        {iniciar_arte === 0 && (
                            <button
                                type="button"
                                className="btn btn-primary flex-grow-1"
                                onClick={handleStartArt}
                                disabled={isStarting || iniciar_arte === 1}
                            >
                                <span className="material-icons mr-2">
                                    brush
                                </span>
                                Iniciar Arte
                            </button>
                        )}

                        {iniciar_produccion === 0 && (
                            <button
                                type="button"
                                className="btn btn-info flex-grow-1"
                                onClick={handleStartProduction}
                                disabled={isStarting}
                            >
                                <span className="material-icons mr-2">
                                    precision_manufacturing
                                </span>
                                Iniciar Producción
                            </button>
                        )}
                        {!(iniciar_arte === 1 || iniciar_produccion === 1) && (
                            <button
                                type="button"
                                className="btn btn-success flex-grow-1"
                                onClick={handleStartBoth}
                                disabled={isStarting}
                            >
                                <span className="material-icons mr-2">
                                    task_alt
                                </span>
                                Iniciar Arte y Producción
                            </button>
                        )}
                    </div>
                )
            ) : (
                <div className="modal-footer bg-danger">
                    <p className="d-flex text-white align-items-center h6">
                        <span className="material-icons mr-2">warning</span>
                        Esta negociación no puede iniciar arte o producción sin
                        ordenes de compra y un codigo PO
                    </p>
                </div>
            )}
        </React.Fragment>
    );
};

export default NegotiationModal;
