import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openModal } from "../../store/actions/modalActions";
import TaskModal from "./TaskModal";

const TaskCard = ({ task }) => {
    const dispatch = useDispatch();
    const { id, nombre, descripcion, usuario } = task;
    const user = useSelector(state => state.auth.user);
    
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

    return (
        <Link to={`tasks/${id}`}>
            <div className="card task-card">
                <div className="card-header">
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

                <div className="card-body">{descripcion}</div>

                <div className="card-footer">
                    <div className="d-flex justify-content-between w-100 flex-wrap">
                        <div className="stats">
                            <i className="material-icons">access_time</i>{" "}
                            Finalización : Mañana Días Restantes: 2 Días
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
