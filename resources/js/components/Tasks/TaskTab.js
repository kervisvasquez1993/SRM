import React from "react";
import { BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";
import { dateToString } from "../../utils";

const TaskTab = ({ task, user = null }) => {
    return (
        <React.Fragment>
            <p>
                <strong>Nombre : </strong>
                {task.nombre}
            </p>

            {user && (
                <p className="d-flex">
                    <strong>Persona a cargo : </strong>
                    <span className="material-icons">person</span>
                    {user.name}
                </p>
            )}

            <p>
                <strong>Fecha de Finalizacion : </strong>
                {dateToString(new Date(task.fecha_fin))}
            </p>

            <div>
                <strong>Descripción : </strong>
                <div
                    className="card-text rich-text"
                    dangerouslySetInnerHTML={{ __html: task.descripcion }}
                ></div>
            </div>

            <div className="text-center my-3">
                <Link
                    to={`/tasks/${task.tarea_id}`}
                    className="btn btn-info btn-round"
                >
                    Ver Detalles
                    <BiLink className="icon-normal ml-2" />
                </Link>
            </div>
        </React.Fragment>
    );
};

export default TaskTab;
