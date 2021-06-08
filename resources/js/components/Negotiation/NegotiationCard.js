import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import {
    getColorsForTask,
    getRemainingDaysToFinishTask,
    hasNoProducts
} from "../../utils";
import Accordion from "../UI/Accordion";
import NegotiationModal from "./NegotiationModal";

const NegotiationCard = ({ negotiation }) => {
    const dispatch = useDispatch();
    const { tarea: task, proveedor, compra: purchase } = negotiation;

    const handleOpen = () => {
        dispatch(
            openModal({
                title: proveedor.nombre,
                body: <NegotiationModal negotiation={negotiation} />
            })
        );
    };

    const { text, background } = getColorsForTask(task);

    const remainingDays = getRemainingDaysToFinishTask(task);

    return (
        <div
            className={`card my-2 fade-in py-2 ${text} ${background}`}
            onClick={handleOpen}
            style={{ cursor: "pointer" }}
        >
            <div className="card-header ">
                <div className="row">
                    <div className="col-sm h4 d-flex mb-3">
                        <span className="material-icons mr-2">business</span>
                        <span>
                            Proveedor : <strong>{proveedor.nombre}</strong>
                        </span>
                    </div>
                    <div className="col-sm h4 d-flex">
                        <span className="material-icons mr-2">task</span>
                        <span>
                            Tarea : <strong>{task.nombre}</strong>
                        </span>
                    </div>
                </div>
            </div>

            <div className="card-body py-0 my-0 ml-2">
                {(hasNoProducts(negotiation) && !purchase && (
                    <p className="card-text d-flex align-items-center">
                        <span className="material-icons mr-2 text-danger">
                            warning
                        </span>
                        Esta negociación no tiene productos ni una orden de
                        compra
                    </p>
                )) ||
                    (hasNoProducts(negotiation) && (
                        <p className="card-text d-flex align-items-center">
                            <span className="material-icons mr-2 text-danger">
                                warning
                            </span>
                            Esta negociación no tiene productos
                        </p>
                    )) ||
                    (!purchase && (
                        <p className="card-text d-flex align-items-center">
                            <span className="material-icons mr-2 text-danger">
                                warning
                            </span>
                            Esta negociación no tiene una orden de compra
                        </p>
                    ))}
            </div>

            <div className="card-footer">
                <div className="d-flex justify-content-between w-100 flex-wrap mt-2">
                    <div className="mb-2 d-flex">
                        {background === "bg-danger" ? (
                            <React.Fragment>
                                <i className="material-icons mr-1">warning</i>
                                <strong>Esta tarea expiró</strong>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <i className="material-icons mr-1">
                                    access_time
                                </i>
                                <strong>
                                    Finaliza en {remainingDays} días
                                </strong>
                            </React.Fragment>
                        )}
                    </div>

                    <button className="btn btn-sm btn-info btn-round">
                        Ver Detalles
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NegotiationCard;
