import React from "react";
import { AiOutlineSelect } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
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
        confirmacion_productos,
        seleccionado
    } = negotiation;

    const handleSelectProvider = () => {
        console.log("Seleccionar este proveedor")
    };

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

    const selectionButton = (
        <button
            type="button"
            className="btn btn-info ml-4"
            onClick={handleSelectProvider}
        >
            <AiOutlineSelect className="icon-normal mr-2" />
            Seleccionar esta empresa
        </button>
    );

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

            {confirmacion_productos && !seleccionado && (
                <div className="modal-footer bg-danger">{selectionButton}</div>
            )}

            {seleccionado && (
                <div className="modal-footer">
                    {!iniciar_arte && (
                        <button
                            type="button"
                            className="btn btn-primary flex-grow-1"
                            onClick={handleStartArt}
                            disabled={isStarting || iniciar_arte}
                        >
                            <span className="material-icons mr-2">brush</span>
                            Iniciar Arte
                        </button>
                    )}

                    {!iniciar_produccion && (
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
                </div>
            )}

            {!confirmacion_productos && (
                <div className="modal-footer bg-danger">
                    <p className="d-flex text-white align-items-center h6">
                        <span className="material-icons mr-2">warning</span>
                        Aún no se han confirmado los productos
                    </p>

                    {selectionButton}
                </div>
            )}
        </React.Fragment>
    );
};

export default NegotiationModal;
