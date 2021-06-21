import React from "react";
import { useDispatch } from "react-redux";
import { updateClaim } from "../../store/actions/claimActions";
import { openModal } from "../../store/actions/modalActions";
import { isClaimCompleted } from "../../utils";
import NegotiationTabs from "../Negotiation/NegotiationTabs";
import ClaimManagementModal from "./ClaimManagementModal";

const ClaimCard = ({ claim }) => {
    const dispatch = useDispatch();

    const {
        pivot: { tarea, proveedor },
        recepcion_mercancia,
        inspeccion_carga,
        reclamos_devoluciones
    } = claim;

    const handleOpenInfo = e => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(
            openModal({
                title: proveedor.nombre,
                body: <NegotiationTabs negotiation={claim.pivot} />
            })
        );
    };

    const handleOpenManagement = () => {
        dispatch(
            openModal({
                title: proveedor.nombre,
                body: <ClaimManagementModal claimId={claim.id} />
            })
        );
    };

    const handleCheck = e => {
        const data = {
            ...claim,
            [e.target.id]: !Boolean(claim[e.target.id])
        };

        dispatch(updateClaim(data));
    };

    const handleCheckClick = e => {
        e.stopPropagation();
    };

    return (
        <div
            className={`card my-2 fade-in py-2 ${
                isClaimCompleted(claim) ? "bg-success text-white" : ""
            }`}
            onClick={handleOpenManagement}
            style={{ cursor: "pointer" }}
        >
            <div className="card-header ">
                <div className="row">
                    <div className="col-sm h4 d-flex mb-3">
                        <span className="material-icons mr-2">business</span>
                        Proveedor : <strong>{proveedor.nombre}</strong>
                    </div>
                    <div className="col-sm h4 d-flex">
                        <span className="material-icons mr-2">task</span>
                        Tarea : <strong>{tarea.nombre}</strong>
                    </div>
                </div>
            </div>

            <div className="card-body py-0 my-0 ml-2">
                <div className="form-check form-check p-1">
                    <label
                        className="form-check-label"
                        onClick={handleCheckClick}
                    >
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="recepcion_mercancia"
                            onChange={handleCheck}
                            checked={recepcion_mercancia}
                        />
                        Recepción de Mercancía
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                    </label>
                </div>

                <div className="form-check form-check p-1">
                    <label
                        className="form-check-label"
                        onClick={handleCheckClick}
                    >
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="inspeccion_carga"
                            onChange={handleCheck}
                            checked={inspeccion_carga}
                        />
                        Inspección de Carga
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                    </label>
                </div>

                <div className="form-check form-check p-1">
                    <label
                        className="form-check-label"
                        onClick={handleCheckClick}
                    >
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="reclamos_devoluciones"
                            onChange={handleCheck}
                            checked={reclamos_devoluciones}
                        />
                        Reclamos y Devoluciones
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                    </label>
                </div>
            </div>

            <div className="card-footer">
                <div className="d-flex justify-content-end align-items-center w-100 flex-wrap">
                    <button className="btn btn-success btn-round">
                        Administrar
                    </button>
                    <button
                        className="btn btn-info btn-round"
                        onClick={handleOpenInfo}
                    >
                        Ver Información
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClaimCard;
