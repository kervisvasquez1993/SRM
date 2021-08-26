import React from "react";
import StageCompletedMessage from "./Other/StageCompletedMessage";
import { useDispatch, useSelector } from "react-redux";
import { MdTouchApp } from "react-icons/md";
import { confirmDelete } from "../../../appText";
import { selectNegotiation } from "../../../store/actions/negotiationActions";

const SupplierSelectionTab = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const negotiation = useSelector(state => state.negotiation.negotiation);
    // @ts-ignore
    const user = useSelector(state => state.auth.user);

    const handleSelectSupplier = e => {
        e.preventDefault();

        if (confirm(confirmDelete)) {
            dispatch(selectNegotiation(negotiation));
        }
    };

    if (user.rol === "logistica") {
        return (
            <div className="d-flex align-items-center justify-content-center">
                <span className="material-icons mr-2 text-danger">warning</span>
                <p className="m-0">
                    Los coordinadores y compradores están a cargo de completar
                    esta etapa
                </p>
            </div>
        );
    }

    return (
        <div className="d-flex flex-column align-items-center">
            {negotiation.seleccionado ? (
                <StageCompletedMessage />
            ) : (
                <React.Fragment>
                    <p>
                        Las demas empresas agregadas a la tarea seran
                        descartadas al seleccionar esta
                    </p>
                    <button
                        type="button"
                        className="btn btn-info btn-lg"
                        onClick={handleSelectSupplier}
                    >
                        <MdTouchApp className="icon-normal mr-2" />
                        Seleccionar esta empresa
                    </button>
                </React.Fragment>
            )}
        </div>
    );
};

export default SupplierSelectionTab;
