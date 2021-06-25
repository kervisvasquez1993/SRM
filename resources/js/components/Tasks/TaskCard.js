import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openModal } from "../../store/actions/modalActions";
import {
    dateToString,
    getRemainingDaysToFinishTask,
    getColorsForTask,
    greenCard,
    useSimpleUrlFocus
} from "../../utils";
import TaskModal from "./TaskModal";

const TaskCard = ({ task }) => {
    const dispatch = useDispatch();
    const { id, nombre, descripcion, usuario, fecha_fin, completada } = task;
    const user = useSelector(state => state.auth.user);

    const [container, focusClassName] = useSimpleUrlFocus(id, "id");

    const handleEdit = e => {
        e.preventDefault();

        const taskToEdit = {
            ...task,
            user_id: task.usuario.id
        };

        dispatch(
            openModal({
                title: "Agregar Tarea",
                body: <TaskModal task={taskToEdit} isEditor={true} />
            })
        );
    };

    const { text, background } = completada
        ? greenCard
        : getColorsForTask(task);

    const remainingDays = getRemainingDaysToFinishTask(task);

    return (
        <Link to={`/tasks/${id}`}>
            <div
                ref={container}
                className={`card my-2 task-card fade-in ${focusClassName} ${text} ${background}`}
            >
                <div className="card-header mb-1">
                    <div className="card-text">
                        <h5 className="card-title d-flex justify-content-between w-100">
                            <span className="tarea">{nombre}</span>
                            <span>
                                <i className="material-icons">person</i>
                                {usuario.name}
                            </span>
                        </h5>
                    </div>
                    <hr className="mb-1" />

                    <p className="card-text text-right">
                        {task.cantidad_proveedores > 0
                            ? `${task.cantidad_proveedores} ${
                                  task.cantidad_proveedores === 1
                                      ? "empresa"
                                      : "empresas"
                              }`
                            : `Sin empresas`}
                    </p>
                </div>

                <div className="card-body">
                    <div className="card-text keep-line-breaks">
                        <div dangerouslySetInnerHTML={{ __html: task.descripcion }} />
                    </div>
                </div>

                <div className="card-footer">
                    <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
                        <div>
                            {background != "bg-success" &&
                                (background === "bg-danger" ? (
                                    <React.Fragment>
                                        <i className="material-icons mr-1">
                                            warning
                                        </i>
                                        <strong>Esta tarea expiró</strong>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <i className="material-icons mr-1">
                                            access_time
                                        </i>
                                        <span>
                                            <strong>Finalización : </strong>
                                            {dateToString(
                                                new Date(fecha_fin)
                                            )}{" "}
                                            ({remainingDays} días restantes)
                                        </span>
                                    </React.Fragment>
                                ))}
                        </div>

                        <div>
                            {user.rol === "coordinador" && (
                                <button
                                    className="btn btn-sm btn-primary btn-round"
                                    onClick={handleEdit}
                                >
                                    <span className="material-icons">edit</span>
                                    Editar
                                </button>
                            )}

                            <button className="btn btn-sm btn-info btn-round">
                                Ver Detalle
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default TaskCard;
