import React from "react";
import { AiOutlineBarcode, AiOutlineZoomIn } from "react-icons/ai";
import { FaBoxOpen, FaInfo } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { ImInfo, ImNewspaper } from "react-icons/im";
import { CgClose } from "react-icons/cg";
import { IoInformation } from "react-icons/io5";
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
import { Link } from "react-router-dom";

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

    // const handleOpenManagement = () => {
    //     dispatch(
    //         openModal({
    //             title: getNegotiationModalName(pivot),
    //             body: <ClaimManagementModal claimId={claim.id} />
    //         })
    //     );
    // };

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

    const currentStep = reclamos_devoluciones
        ? 2
        : inspeccion_carga
        ? 2
        : recepcion_mercancia
        ? 1
        : 0;

    const percentageCompleted = (currentStep / 2) * 100;

    return (
        <div
            className={`card my-2 fade-in py-2 ${
                isClaimCompleted(claim) ? "bg-success text-white" : ""
            } ${focusClassName}`}
            onClick={handleOpenInfo}
            style={{ cursor: "pointer" }}
            ref={ref}
        >
            <div className="card-header ml-2 d-flex align-items-center mb-4">
                <div className="h4 m-0 d-flex">
                    <AiOutlineBarcode className="icon-normal mr-2" />
                    <p className="mb-0">
                        Codigo : <strong>{compra_po}</strong>
                    </p>
                </div>

                <div className="flex-grow-1 d-flex justify-content-end align-items-center">
                    <button
                        className="btn btn-round d-sm-none"
                        onClick={handleOpenInfo}
                    >
                        <FaInfo className="icon-small" />
                    </button>

                    <button
                        className="btn btn-sm btn-round d-none d-sm-block"
                        onClick={handleOpenInfo}
                    >
                        <FaInfo className="icon-small mr-2" />
                        Información
                    </button>
                </div>
            </div>

            <div className="card-body py-0 my-0 ml-2">
                {/* <div className="col-md d-md-flex justify-content-around">
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
                    </div> */}

                <div className="p-2 px-3">
                    <div className="mb-5 d-flex flex-column align-items-center">
                        <div className="progress-container w-100">
                            <div className="bar">
                                <div
                                    className="bar-progress"
                                    style={{ width: `${percentageCompleted}%` }}
                                ></div>
                            </div>

                            <div
                                className={`progress-status progress-warning ${recepcion_mercancia &&
                                    "completed"} ${
                                    currentStep === 0 ? "current" : ""
                                }`}
                            >
                                <GiCheckMark className="icon-done" />
                                <CgClose className="icon-not-done" />
                                <p>Recepción</p>
                            </div>
                            <div
                                className={`progress-status progress-warning ${inspeccion_carga &&
                                    "completed"} ${
                                    currentStep === 1 ? "current" : ""
                                }`}
                            >
                                <GiCheckMark className="icon-done" />
                                <CgClose className="icon-not-done" />
                                <p>Inspección</p>
                            </div>
                            <div
                                className={`progress-status progress-warning ${reclamos_devoluciones &&
                                    "completed"} ${
                                    currentStep === 2 ? "current" : ""
                                }`}
                            >
                                <GiCheckMark className="icon-done" />
                                <CgClose className="icon-not-done" />
                                <p>Reclamos y Devoluciones</p>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-lg-row justify-content-center mb-2">
                        <Link
                            to={`/claims/${id}/reception`}
                            className=" btn btn-sm btn-warning mx-4 flex-basis-0 flex-grow-1"
                        >
                            <FaBoxOpen className="icon-normal mr-2" />
                            Recepción
                        </Link>
                        <Link
                            to={`/claims/${id}/inspection`}
                            className=" btn btn-sm btn-info mx-4 flex-basis-0 flex-grow-1"
                        >
                            <AiOutlineZoomIn className="icon-normal mr-2" />
                            Inspección
                        </Link>
                        <Link
                            to={`/claims/${id}/claim`}
                            className=" btn btn-sm btn-success mx-4 flex-basis-0 flex-grow-1"
                        >
                            <ImNewspaper className="icon-normal mr-2" />
                            Reclamos y Devoluciones
                        </Link>
                    </div>

                    {/* <div className="d-flex justify-content-end align-items-center">
                        <button
                            className="btn btn-sm btn-info btn-round"
                            onClick={handleOpenInfo}
                        >
                            <ImInfo className="icon-normal mr-2" />
                            Información
                        </button>
                    </div> */}

                    {/* <div className="d-flex justify-content-end align-items-center">
                        <button
                            className="btn btn-sm btn-info"
                            onClick={handleOpenInfo}
                        >
                            <IoInformation className="icon-normal" />
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default ClaimCard;
