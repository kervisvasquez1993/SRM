import axios from "axios";
import React from "react";

const TaskCard = ({ nombre, descripcion, usuario }) => {
    return (
        <div className="card">
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
                <div className="d-flex justify-content-between w-100 flex-wrap"></div>
            </div>
        </div>
    );
};

export default TaskCard;
