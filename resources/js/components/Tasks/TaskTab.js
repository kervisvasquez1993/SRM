import React from "react";
import { dateToString } from "../../utils";

const TaskTab = ({ task, user }) => {
    return (
        <React.Fragment>
            <p>
                <strong>Nombre : </strong>
                {task.nombre}
            </p>

            <p className="d-flex">
                <strong>Persona a cargo : </strong>
                <span className="material-icons">person</span>
                {user.name}
            </p>

            <p>
                <strong>Fecha de Finalizacion : </strong>
                {dateToString(new Date(task.fecha_fin))}
            </p>

            <p className="keep-line-breaks">
                <strong>Descripción : </strong>
                {task.descripcion}
            </p>
        </React.Fragment>
    );
};

export default TaskTab;
