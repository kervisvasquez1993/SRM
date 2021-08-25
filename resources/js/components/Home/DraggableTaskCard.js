import React from "react";
import { AiOutlineBarcode } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { BsBuilding } from "react-icons/bs";
import { IoArrowRedoSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import {
    blueCard,
    getColorsForTask,
    getRemainingDaysToFinishTask,
    useUser
} from "../../utils";
import DraggableTaskModal from "./Tabs/DraggableTaskModal";

function DraggableTaskCard({ draggableTask, column, invalidDrop, snapshot }) {
    const dispatch = useDispatch();
    const loggedUser = useUser();

    const data = draggableTask.data;
    const task = data.tarea;
    const isMine = data.tarea.usuario.id === loggedUser.id;

    let { text, background } =
        column >= 2 || data.produccion_o_arte
            ? blueCard
            : getColorsForTask(data);

    const remainingDays = getRemainingDaysToFinishTask(data);

    // let canBeMovedToNextStage = true;

    // if (column === 0 && (!data.tiene_productos || !data.produccion_o_arte)) {
    //     canBeMovedToNextStage = false;
    // } else if (column === 1 && !data.arte_iniciada) {
    //     canBeMovedToNextStage = false;
    // } else if (column === 2 && !data.produccion_iniciada) {
    //     canBeMovedToNextStage = false;
    // } else if (
    //     column === 3 &&
    //     data.produccion_iniciada &&
    //     !data.produccion_iniciada.recepcion_reclamo_devolucion
    // ) {
    //     canBeMovedToNextStage = false;
    // } else if (column === 4) {
    //     canBeMovedToNextStage = false;
    // }

    let canBeMovedToNextStage = column != 4;

    const tieneProductos = data.tiene_productos;
    const negociacion_seleccionada = data.negociacion_seleccionada;
    const arte = negociacion_seleccionada && negociacion_seleccionada.arte;
    const produccion_transito =
        negociacion_seleccionada &&
        negociacion_seleccionada.produccion_transito;

    const recepcion_reclamo_devolucion =
        produccion_transito && produccion_transito.recepcion_reclamo_devolucion;

    if (column === 0 && !tieneProductos) {
        canBeMovedToNextStage = false;
    }

    if (column === 1 && !arte) {
        canBeMovedToNextStage = false;
    }

    if (column === 2 && !produccion_transito) {
        canBeMovedToNextStage = false;
    }

    if (column === 3 && !recepcion_reclamo_devolucion) {
        canBeMovedToNextStage = false;
    }

    const handleClick = () => {
        dispatch(
            openModal({
                title: task.nombre,
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
                        <h3 className="tarea h4">{task.nombre}</h3>

                        <hr className="mb-1" />

                        {column >= 2 && (
                            <div className="d-flex align-items-center">
                                <AiOutlineBarcode className="icon-small mr-1" />
                                <span>
                                    {negociacion_seleccionada.compra_po}
                                </span>
                            </div>
                        )}

                        {column < 2 && (
                            <div className="d-flex justify-content-between">
                                {background === "bg-blue" ? (
                                    <div></div>
                                ) : (
                                    <div className="d-flex align-items-center">
                                        <BiTimeFive className="icon-small mr-1" />
                                        <span>
                                            {remainingDays > 0
                                                ? `${remainingDays} días`
                                                : "Vencida"}
                                        </span>
                                    </div>
                                )}

                                {column === 0 && (
                                    <div className="d-flex align-items-center">
                                        <BsBuilding className="icon-small mr-1" />
                                        <span>{task.cantidad_proveedores}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {isMine && canBeMovedToNextStage && (
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
