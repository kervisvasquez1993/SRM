import React from "react";
import { AiOutlineBarcode } from "react-icons/ai";
import { FcFactoryBreakdown } from "react-icons/fc";
import { GiFactory } from "react-icons/gi";
import { IoTimeOutline } from "react-icons/io5";
import {
    getColorsForTask,
    getRemainingDaysToFinishTask,
    greenCard
} from "../../utils";

function DraggableTaskCard({ task, column, invalidDrop, snapshot }) {
    const { nombre, inicio_produccion, usuario_nombre } = task;

    const { text, background } = inicio_produccion
        ? greenCard
        : getColorsForTask(task);

    const remainingDays = getRemainingDaysToFinishTask(task);

    return (
        <React.Fragment>
            {invalidDrop && snapshot.isDragging ? (
                <div className={`card my-0 text-white bg-danger`}>
                    <div className="card-header">
                        <h3 className="tarea h4">
                            Está tarea no puede pasar a esta etapa
                        </h3>
                    </div>
                </div>
            ) : (
                <div className={`card my-0 ${text} ${background}`}>
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
                            <span>{usuario_nombre}</span>
                        </div>

                        {column < 2 && <hr className="mb-1" />}

                        {column < 2 && (
                            <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    <span className="material-icons md-18 mr-1">
                                        access_time
                                    </span>
                                    <span>{remainingDays} días</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="material-icons md-18 mr-1">
                                        business
                                    </span>
                                    <span>{task.cantidad_proveedores}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

export default DraggableTaskCard;
