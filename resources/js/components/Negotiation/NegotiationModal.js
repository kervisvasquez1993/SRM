import React from "react";
import { MdTouchApp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { confirmDelete } from "../../appText";
import {
    selectNegotiation,
    startArtWithNegotiation,
    startProductionWithNegotiation
} from "../../store/actions/negotiationActions";
import NegotiationTabs from "./NegotiationTabs";

const NegotiationModal = ({ negotiation }) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const user = useSelector(state => state.auth.user);

    // @ts-ignore
    const isStarting = useSelector(state => state.negotiation.isStarting);

    const {
        id,
        iniciar_produccion,
        iniciar_arte,
        productos_confirmados,
        seleccionado,
        compra_po
    } = negotiation;

    const handleSelectProvider = () => {
        if (confirm(confirmDelete)) {
            dispatch(selectNegotiation(negotiation));
        }
    };

    const handleStartProduction = () => {
        if (confirm(confirmDelete)) {
            dispatch(startProductionWithNegotiation(negotiation));
        }
    };

    const handleStartArt = () => {
        if (confirm(confirmDelete)) {
            dispatch(startArtWithNegotiation(negotiation));
        }
    };

    const selectionButton = (
        <button
            type="button"
            className="btn btn-info ml-4"
            onClick={handleSelectProvider}
        >
            <MdTouchApp className="icon-normal mr-2" />
            Seleccionar esta empresa
        </button>
    );

    return (
        <React.Fragment>
            <NegotiationTabs negotiation={negotiation} />

            {seleccionado && user.rol == "coordinador" && compra_po && (
                <div className="modal-footer d-flex flex-row justify-content-between flex-nowrap">
                    <div className="flex-grow-1 w-100">
                        {iniciar_produccion && (
                            <p className="d-flex align-items-center h6 pl-4">
                                <span className="material-icons mr-2 text-success">
                                    check_circle
                                </span>
                                Producción iniciada
                            </p>
                        )}
                        {iniciar_arte && (
                            <p className="d-flex align-items-center h6 pl-4">
                                <span className="material-icons mr-2 text-success">
                                    check_circle
                                </span>
                                Arte iniciada
                            </p>
                        )}
                    </div>

                    <div>
                        {!iniciar_arte && (
                            <button
                                type="button"
                                className="btn btn-primary flex-grow-1 w-100"
                                onClick={handleStartArt}
                                disabled={isStarting || iniciar_arte}
                            >
                                <span className="material-icons mr-2">
                                    brush
                                </span>
                                Iniciar Arte
                            </button>
                        )}

                        {!iniciar_produccion && (
                            <button
                                type="button"
                                className="btn btn-info flex-grow-1 w-100"
                                onClick={handleStartProduction}
                                disabled={isStarting}
                            >
                                <span className="material-icons mr-2">
                                    precision_manufacturing
                                </span>
                                Iniciar Producción
                            </button>
                        )}
                    </div>
                </div>
            )}

            {seleccionado && !compra_po && (
                <div className="modal-footer bg-danger">
                    <p className="d-flex text-white align-items-center h6">
                        <span className="material-icons mr-2">warning</span>
                        Se necesita un codigo PO para iniciar arte o producción
                    </p>
                </div>
            )}

            {!seleccionado &&
                productos_confirmados &&
                user.rol == "coordinador" && (
                    <div className="modal-footer">{selectionButton}</div>
                )}

            {!productos_confirmados && (
                <div className="modal-footer bg-danger">
                    <p className="d-flex text-white align-items-center h6">
                        <span className="material-icons mr-2">warning</span>
                        Aún no se han confirmado los productos
                    </p>

                    {!seleccionado &&
                        user.rol == "coordinador" &&
                        selectionButton}
                </div>
            )}
        </React.Fragment>
    );
};

export default NegotiationModal;
