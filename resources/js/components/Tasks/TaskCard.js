import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openModal } from "../../store/actions/modalActions";
import { dateToString } from "../../utils";
import TaskModal from "./TaskModal";

const TaskCard = ({ task }) => {
    const dispatch = useDispatch();
    const { id, nombre, descripcion, usuario, fecha_fin } = task;
    const user = useSelector(state => state.auth.user);
    const editedTask = useSelector(state => state.task.editedTask);

    // Animations
    const [fadeInFinished, setFadeInFinished] = useState(false);

    const handleEdit = e => {
        e.preventDefault();

        const taskToEdit = {
            id: task.id,
            nombre: task.nombre,
            user_id: task.usuario.id,
            fecha_fin: task.fecha_fin.split(" ")[0],
            descripcion: task.descripcion
        };

        dispatch(
            openModal({
                title: "Agregar Tarea",
                body: <TaskModal task={taskToEdit} isEditor={true} />
            })
        );
    };

    const styles = {
        animation: "fade-in"
    };

    const handleFadeInEnd = () => {
        setFadeInFinished(true);
    };

    return (
        <Link to={`tasks/${id}`}>
            <div
                className={`card task-card ${fadeInFinished ? "" : "fade-in"} ${
                    editedTask && editedTask.id === id ? "jump" : ""
                }`}
                onAnimationEnd={handleFadeInEnd}
            >
                <div className="card-header ">
                    <div className="card-text">
                        <h5 className="card-title d-flex justify-content-between w-100">
                            <span className="tarea">{nombre}</span>
                            <span>
                                <i className="material-icons">person</i>
                                {usuario.name}
                            </span>
                        </h5>
                    </div>
                    <hr />
                </div>

                <div className="card-body">
                    <div className="card-text keep-line-breaks">{descripcion}</div>
                </div>

                <div className="card-footer">
                    <div className="d-flex justify-content-between w-100 flex-wrap">
                        <div className="d-flex align-items-center">
                            <i className="material-icons mr-1">access_time</i>
                            <strong>Finalización :</strong>

                            {dateToString(new Date(fecha_fin))}
                        </div>

                        <div>
                            {user.rol === "coordinador" && (
                                <button
                                    href="#"
                                    className="btn btn-sm btn-outline-warning btn-round"
                                    onClick={handleEdit}
                                >
                                    Editar
                                </button>
                            )}

                            <button className="btn btn-sm btn-outline-success btn-round">
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
