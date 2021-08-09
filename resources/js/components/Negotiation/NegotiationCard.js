import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import {
    getColorsForTask,
    getNegotiationModalName,
    getRemainingDaysToFinishTask,
    greenCard,
    useSimpleUrlFocus
} from "../../utils";
import NegotiationModal from "./NegotiationModal";

const NegotiationCard = ({
    negotiation,
    compare,
    selectedNegotiations,
    toggleCheckbox
}) => {
    const dispatch = useDispatch();
    const {
        id,
        iniciar_produccion,
        iniciar_arte,
        tarea: task,
        proveedor
    } = negotiation;

    const [container, focusClassName] = useSimpleUrlFocus(id, "id");

    const handleOpen = () => {
        if (compare) {
            toggleCheckbox(id);
        } else {
            dispatch(
                openModal({
                    title: getNegotiationModalName(negotiation),
                    body: <NegotiationModal negotiation={negotiation} />
                })
            );
        }
    };

    const handleCheck = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    const stopPropagation = e => {
        e.stopPropagation();
    };

    const { text, background } =
        iniciar_arte && iniciar_produccion ? greenCard : getColorsForTask(task);

    const remainingDays = getRemainingDaysToFinishTask(task);

    return (
        <React.Fragment>
            <div
                className="d-flex align-items-center cursor-pointer"
                onClick={handleOpen}
            >
                {compare && (
                    <div
                        className="form-check form-check p-1 mr-2"
                        style={{ transform: "scale(1.3)" }}
                    >
                        <label className="form-check-label">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="inicio_produccion"
                                checked={selectedNegotiations.includes(id)}
                                onChange={handleCheck}
                                onClick={stopPropagation}
                            />
                            <span className="form-check-sign">
                                <span className="check"></span>
                            </span>
                        </label>
                    </div>
                )}

                <div
                    ref={container}
                    className={`card my-2 fade-in py-2 ${text} ${background} ${focusClassName}`}
                >
                    <div className="card-header ">
                        <div className="row">
                            <div className="col-sm h4 d-flex mb-3">
                                <span className="material-icons mr-2">
                                    business
                                </span>
                                <span>
                                    Proveedor :{" "}
                                    <strong>{proveedor.nombre}</strong>
                                </span>
                            </div>
                            <div className="col-sm h4 d-flex">
                                <span className="material-icons mr-2">
                                    task
                                </span>
                                <span>
                                    Tarea : <strong>{task.nombre}</strong>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="card-body py-0 my-0 ml-2">
                        {!negotiation.productos_confirmados && (
                            <p className="card-text d-flex align-items-center">
                                <span className="material-icons mr-2 text-danger">
                                    warning
                                </span>
                                Aún no se han confirmado los productos
                            </p>
                        )}

                        {negotiation.productos_confirmados &&
                            negotiation.seleccionado && (
                                <React.Fragment>
                                    {!negotiation.iniciar_produccion && (
                                        <p className="card-text d-flex align-items-center">
                                            <span className="material-icons mr-2 text-danger">
                                                warning
                                            </span>
                                            Aún no se ha iniciado producción
                                        </p>
                                    )}

                                    {!negotiation.iniciar_arte && (
                                        <p className="card-text d-flex align-items-center">
                                            <span className="material-icons mr-2 text-danger">
                                                warning
                                            </span>
                                            Aún no se ha iniciado arte
                                        </p>
                                    )}
                                </React.Fragment>
                            )}
                    </div>

                    {!compare && (
                        <div className="card-footer">
                            <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
                                <div className="d-flex">
                                    {background != "bg-success" &&
                                        (background === "bg-danger" ? (
                                            <React.Fragment>
                                                <i className="material-icons mr-1">
                                                    warning
                                                </i>
                                                <strong>
                                                    Esta tarea expiró
                                                </strong>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <i className="material-icons mr-1">
                                                    access_time
                                                </i>
                                                <strong>
                                                    Finaliza en {remainingDays}{" "}
                                                    días
                                                </strong>
                                            </React.Fragment>
                                        ))}
                                </div>

                                <button className="btn btn-sm btn-info btn-round">
                                    Ver Detalles
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default NegotiationCard;
