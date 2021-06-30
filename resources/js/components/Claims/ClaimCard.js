import React from "react";
import { AiOutlineBarcode } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { StringParam, useQueryParam } from "use-query-params";
import { updateClaim } from "../../store/actions/claimActions";
import { openModal } from "../../store/actions/modalActions";
import {
    getNegotiationModalName,
    isClaimCompleted,
    useSimpleUrlFocus
} from "../../utils";
import NegotiationTabs from "../Negotiation/NegotiationTabs";
import ClaimManagementModal from "./ClaimManagementModal";

const ClaimCard = ({ claim }) => {
    const dispatch = useDispatch();

    const {
        id,
        pivot: { tarea, proveedor, compra_po },
        pivot,
        recepcion_mercancia,
        inspeccion_carga,
        reclamos_devoluciones
    } = claim;

    const [tab] = useQueryParam("tab", StringParam);

    const [ref, focusClassName] = useSimpleUrlFocus(claim.id, "id", () => {
        if (tab) {
            dispatch(
                openModal({
                    title: getNegotiationModalName(pivot),
                    body: <ClaimManagementModal claimId={claim.id} />,
                    defaultTab: tab
                })
            );
        }
    });

    const handleOpenInfo = e => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(
            openModal({
                title: getNegotiationModalName(pivot),
                body: <NegotiationTabs negotiation={pivot} />
            })
        );
    };

    const handleOpenManagement = () => {
        dispatch(
            openModal({
                title: getNegotiationModalName(pivot),
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
            } ${focusClassName}`}
            onClick={handleOpenManagement}
            style={{ cursor: "pointer" }}
            ref={ref}
        >
            <div className="card-header ml-2">
                <div className="col-sm h4 d-flex mb-3">
                    <AiOutlineBarcode className="icon-normal mr-2" />
                    <p className="mb-0">
                        Codigo : <strong>{compra_po}</strong>
                    </p>
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
