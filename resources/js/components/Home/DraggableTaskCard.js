import React from "react";
import { AiOutlineBarcode } from "react-icons/ai";
import { IoArrowRedoSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import {
    blueCard,
    getColorsForTask,
    getRemainingDaysToFinishTask
} from "../../utils";
import DraggableTaskModal from "./Tabs/DraggableTaskModal";

function DraggableTaskCard({ draggableTask, column, invalidDrop, snapshot }) {
    const dispatch = useDispatch();

    const task = draggableTask.task;
    const { nombre, produccion_iniciada, usuario } = draggableTask.task;

    let { text, background } =
        column >= 2 || produccion_iniciada ? blueCard : getColorsForTask(task);

    const remainingDays = getRemainingDaysToFinishTask(task);

    let canBeMovedToNextStage = true;

    if (column === 0 && !task.tiene_negociaciones) {
        canBeMovedToNextStage = false;
    } else if (column === 1 && !task.arte_iniciada) {
        canBeMovedToNextStage = false;
    } else if (column === 2 && !task.produccion_iniciada) {
        canBeMovedToNextStage = false;
    } else if (
        column === 3 &&
        task.produccion_iniciada &&
        !task.produccion_iniciada.recepcion_reclamo_devolucion
    ) {
        canBeMovedToNextStage = false;
    } else if (column === 4) {
        canBeMovedToNextStage = false;
    }

    const handleClick = () => {
        dispatch(
            openModal({
                title: nombre,
                body: (
                    <DraggableTaskModal
                        draggableTask={draggableTask}
                        defaultTab={column}
                    />
                )
            })
        );
    };

    return (
        <React.Fragment>
            {invalidDrop && snapshot.isDragging ? (
                <div
                    className={`card my-0 text-white bg-danger`}
                    onClick={handleClick}
                >
                    <div className="card-header">
                        <h3 className="tarea h4">
                            Está tarea no puede pasar a esta etapa
                        </h3>
                    </div>
                </div>
            ) : (
                <div
                    className={`card my-0 ${text} ${background}`}
                    onClick={handleClick}
                >
                    <div className="card-header">
                        <h3 className="tarea h4">{nombre}</h3>

                        {column >= 2 && (
                            <div className="d-flex align-items-center">
                                <AiOutlineBarcode className="icon-small mr-1" />
                                {task.codigo_po ? (
                                    <span>{task.codigo_po}</span>
                                ) : (
                                    <span className="my-2">Sin Codigo PO</span>
                                )}
                            </div>
                        )}

                        <div className="d-flex align-items-center">
                            <span className="material-icons icon-small mr-1">
                                person
                            </span>
                            <span>{usuario.name}</span>
                        </div>

                        {column < 2 && !produccion_iniciada && (
                            <hr className="mb-1" />
                        )}

                        {column < 2 && (
                            <div className="d-flex justify-content-between">
                                {produccion_iniciada ? (
                                    <div></div>
                                ) : (
                                    <div className="d-flex align-items-center">
                                        <span className="material-icons md-18 mr-1">
                                            access_time
                                        </span>
                                        <span>
                                            {remainingDays > 0
                                                ? `${remainingDays} días`
                                                : "Vencida"}
                                        </span>
                                    </div>
                                )}
                                {column === 0 && (
                                    <div className="d-flex align-items-center">
                                        <span className="material-icons md-18 mr-1">
                                            business
                                        </span>
                                        <span>{task.cantidad_proveedores}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {canBeMovedToNextStage && (
                        <div className="move-next-stage-icon">
                            <IoArrowRedoSharp />
                        </div>
                    )}
                </div>
            )}
        </React.Fragment>
    );
}

export default DraggableTaskCard;
